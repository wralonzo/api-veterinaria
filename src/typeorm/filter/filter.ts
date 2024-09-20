import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { catchError, map, Observable, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'messsage',
      })),
    );
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const req = {
      body: host.switchToHttp().getRequest().body,
      route: host.switchToHttp().getRequest().route
        ? host.switchToHttp().getRequest().route.path
        : '',
      requestType: host.switchToHttp().getRequest().method,
      param: host.switchToHttp().getRequest().params,
      query: host.switchToHttp().getRequest().query,
    };

    const { authorization } = host.switchToHttp().getRequest().headers;
    const token = authorization
      ? authorization.replace('Bearer', '').trim()
      : '';

    const decoded = this.jwtService.decode(token);

    const bodyLog = {
      userCreated: decoded ? decoded.idUser : 'API',
      request: req,
      resType: 'Error',
      response: null,
    };

    const exceptionError: any = exception;
    let errorResponse = this.errorParser(exceptionError);
    bodyLog.response = errorResponse;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorDetail: errorResponse,
    });
  }

  public errorParser(exceptionError: any) {
    try {
      return exceptionError?.response
        ? typeof exceptionError?.response === 'string'
          ? {
              message: exceptionError?.response,
              detail: exceptionError,
            }
          : {
              message: exceptionError?.response.message,
              detail: exceptionError?.response.error,
            }
        : exceptionError.driverError
          ? {
              message: exceptionError.driverError?.message,
              detail: exceptionError.driverError?.detail,
            }
          : {
              message: exceptionError.message,
              detail: exceptionError,
            };
    } catch (error) {
      throw error;
    }
  }
}
