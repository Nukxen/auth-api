import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { validateOrReject } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/users.dto';
@Injectable()
export class UsersService {
  //Injetar o PrismaService para interagir com o banco de dados
  constructor(private readonly db: PrismaService) {}

  /**
   * Essa função recebe os dados do usuário e cria um novo registro no banco de dados.
   */
  async registerUser(dto: CreateUserDto) {
    await validateOrReject(dto);

    const secret = process.env.ARGON2_SECRET!;

    const password_hash = await argon2.hash(dto.password, {
      secret: Buffer.from(secret),
    });

    const user = await this.db.rg_users.create({
      data: { email: dto.email, password_hash, username: dto.username },
    });

    return user;
  }

  authUser() {}

  requestVerificationUser() {}

  changePasswordUser() {}

  requestResetPasswordUser() {}
}
