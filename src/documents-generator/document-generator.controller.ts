import { Response } from "express";
import { Controller, Get, Inject, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from "../common";

@Controller({ path: 'generate/doc', version: '1' })
export class DocumentGeneratorController {
  constructor(@Inject(NATS_SERVICE) private readonly documentClient: ClientProxy) { }
  
  @Get('generate-pdf')
  async generatePdf(@Res() res: Response) {
    const response: any = await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'document-generate.rh-permission.pdf',
      {},
    );

    // Deserializar el PDF desde base64 a Buffer
    const pdfBuffer = Buffer.from(response.data, 'base64');

    // Configurar headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');

    // Enviar el buffer directamente
    res.end(pdfBuffer);
  }
}