import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

/**
 * Essa classe contém métodos estáticos para retornar instâncias de exceções HTTP com códigos de status específicos.
 */
export class ErrorReturn {
  static badRequest(
    message: string = 'Requisição inválida',
  ): BadRequestException {
    return new BadRequestException(message);
  }

  static unprocessableEntity(
    message: string = 'Entidade não processável',
  ): UnprocessableEntityException {
    return new UnprocessableEntityException(message);
  }

  static unauthorized(
    message: string = 'Acesso não autorizado',
  ): UnauthorizedException {
    return new UnauthorizedException(message);
  }

  static forbidden(
    message: string = 'Requisição proibida',
  ): ForbiddenException {
    return new ForbiddenException(message);
  }

  static notFound(
    message: string = 'Requisição não encontrada',
  ): NotFoundException {
    return new NotFoundException(message);
  }

  static conflict(message: string = 'Conflito de dados'): ConflictException {
    return new ConflictException(message);
  }

  static internal(
    message: string = 'Erro interno no servidor',
  ): InternalServerErrorException {
    return new InternalServerErrorException(message);
  }
}
