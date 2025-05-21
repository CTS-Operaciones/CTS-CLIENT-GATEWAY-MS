import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExeptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const cts = host.switchToHttp();
    const response = cts.getResponse();
    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'code' in rpcError &&
      'message' in rpcError
    ) {
      if (rpcError.message.toString().includes('Empty response')) {
        return response.status(500).json({
          statusCode: 500,
          message: rpcError.message
            .toString()
            .substring(0, rpcError.message.toString().indexOf('(') - 1),
        });
      }
      const status = isNaN(+rpcError.code) ? 400 : +rpcError.code;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      statusCode: 400,
      message: 'Error inesperado, desde el microservicio',
    });
  }
}
