import { Response } from 'express';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../common';
import { PermissionFormDto } from './dto/generate-doc.dto';
import { FindStaffForProductionReportDto } from 'src/staffing/staff/dto';

@ApiTags('Generate Doc 📄')
@Controller({ path: 'generate/doc', version: '1' })
export class GenerateDocController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientGenerateDoc: ClientProxy,
  ) {}

  @Post('generate-docx')
  async generateDocx(@Body() data: PermissionFormDto, @Res() res: Response) {
    const response = await sendAndHandleRpcExceptionPromise<any>(
      this.clientGenerateDoc,
      'document-generate.rh-permission.docx',
      data,
    );

    // Convertir la respuesta a Buffer
    let buffer: Buffer;
    if (Buffer.isBuffer(response)) {
      buffer = response;
    } else if (response?.data && response?.type === 'buffer') {
      // Respuesta desde el microservicio con formato { data: base64, type: 'buffer' }
      try {
        buffer = Buffer.from(response.data, 'base64');
        // Validar que el tamaño coincida si está disponible
        if (response.size && buffer.length !== response.size) {
          return res.status(500).json({
            statusCode: 500,
            message: `Error: El tamaño del buffer decodificado (${buffer.length}) no coincide con el esperado (${response.size})`,
          });
        }
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Error al decodificar el documento DOCX desde base64',
        });
      }
    } else if (response instanceof Uint8Array) {
      buffer = Buffer.from(response);
    } else if (Array.isArray(response)) {
      buffer = Buffer.from(response);
    } else if (typeof response === 'string') {
      buffer = Buffer.from(response, 'base64');
    } else if (response?.data && typeof response.data === 'string') {
      // Fallback: intentar como base64
      try {
        buffer = Buffer.from(response.data, 'base64');
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Error al decodificar el documento DOCX desde base64',
        });
      }
    } else {
      return res.status(500).json({
        statusCode: 500,
        message: `Error al generar el documento DOCX: formato de respuesta inválido. Tipo recibido: ${typeof response}, Estructura: ${JSON.stringify(Object.keys(response || {}))}`,
      });
    }

    if (!buffer || buffer.length === 0) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Error al generar el documento DOCX: Buffer vacío',
      });
    }

    // Validar que el archivo DOCX tenga la firma ZIP correcta (PK = 0x504B)
    const zipSignature = buffer.readUInt16LE(0);
    if (zipSignature !== 0x4b50) {
      // Intentar leer como Big Endian
      const zipSignatureBE = buffer.readUInt16BE(0);
      if (zipSignatureBE !== 0x504b) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Error: El archivo generado no tiene un formato DOCX válido',
        });
      }
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=permiso_${data.employeeNumber || 'rh'}_${Date.now()}.docx`,
    );
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('Cache-Control', 'no-cache');
    res.send(buffer);
  }

  @Post('generate-pdf')
  async generatePdf(@Body() data: PermissionFormDto, @Res() res: Response) {
    const response = await sendAndHandleRpcExceptionPromise<any>(
      this.clientGenerateDoc,
      'document-generate.rh-permission.pdf',
      data,
    );

    // Convertir la respuesta a Buffer
    let buffer: Buffer;
    if (Buffer.isBuffer(response)) {
      buffer = response;
    } else if (response?.data && response?.type === 'buffer') {
      // Respuesta desde el microservicio con formato { data: base64, type: 'buffer' }
      try {
        buffer = Buffer.from(response.data, 'base64');
        // Validar que el tamaño coincida si está disponible
        if (response.size && buffer.length !== response.size) {
          return res.status(500).json({
            statusCode: 500,
            message: `Error: El tamaño del buffer decodificado (${buffer.length}) no coincide con el esperado (${response.size})`,
          });
        }
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Error al decodificar el documento PDF desde base64',
        });
      }
    } else if (response instanceof Uint8Array) {
      buffer = Buffer.from(response);
    } else if (Array.isArray(response)) {
      buffer = Buffer.from(response);
    } else if (typeof response === 'string') {
      buffer = Buffer.from(response, 'base64');
    } else if (response?.data && typeof response.data === 'string') {
      // Fallback: intentar como base64
      try {
        buffer = Buffer.from(response.data, 'base64');
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Error al decodificar el documento PDF desde base64',
        });
      }
    } else {
      return res.status(500).json({
        statusCode: 500,
        message: `Error al generar el documento PDF: formato de respuesta inválido. Tipo recibido: ${typeof response}, Estructura: ${JSON.stringify(Object.keys(response || {}))}`,
      });
    }

    if (!buffer || buffer.length === 0) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Error al generar el documento PDF: Buffer vacío',
      });
    }

    // Validar que el PDF tenga la firma correcta (%PDF)
    const pdfSignature = buffer.toString('ascii', 0, 4);
    if (pdfSignature !== '%PDF') {
      return res.status(500).json({
        statusCode: 500,
        message: 'Error: El archivo generado no tiene un formato PDF válido',
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=permiso_${data.employeeNumber || 'rh'}_${Date.now()}.pdf`,
    );
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('Cache-Control', 'no-cache');
    res.send(buffer);
  }

  @Get('generate-xlsx')
  async generateExcel(
    @Res() res: Response,
    @Query() query: FindStaffForProductionReportDto,
  ) {
    const response = await sendAndHandleRpcExceptionPromise<any>(
      this.clientGenerateDoc,
      'generate-protected-excel',
      query,
    );

    const buffer = Buffer.from(response);

    res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('Cache-Control', 'no-cache');
    res.send(buffer);
  }

  @Get('generate-pdf-from-permission/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del permiso de asistencia',
  })
  async generatePdfFromPermission(@Param('id', ParseIntPipe) id: number) {
    // Obtener los datos del permiso desde rh-ms
    return await sendAndHandleRpcExceptionPromise(
      this.clientGenerateDoc,
      'vacation.getVacationDataForPdf',
      { id },
    );
  }

  // @Post('upload-production-report')
  // @UseInterceptors(
  //   AnyFilesInterceptor({ fileFilter, storage }),
  //   CleanupFilesInterceptor,
  // )
  // async uploadProductionReport(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() body: any,
  // ) {
  //   const [file] = Array.isArray(files) ? files : [];

  //   if (!file) {
  //     throw new BadRequestException('El archivo XLSX es requerido');
  //   }

  //   const fileBuffer = await fs.readFile(file.path);

  //   const fileData = {
  //     originalname: file.originalname,
  //     mimetype: file.mimetype,
  //     buffer: fileBuffer.toString('base64'),
  //     encoding: file.encoding,
  //   };

  //   await fs.unlink(file.path).catch(() => undefined);

  //   return await sendAndHandleRpcExceptionPromise(
  //     this.clientGenerateDoc,
  //     'documents.parseProductionExcel',
  //     { file: fileData },
  //   );
  // }
}
