import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
// Classe que indica o corpo necessario pra registrar um usuário
export class CreateUserDto {
  @ApiProperty({name:"username", description:"Nome de usuário do usuário", example:"usuario123"})
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({name:"password", description:"Senha do usuário", example:"senha123"})
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({name:"email", description:"Email do usuário", example:"usuario@example.com"})
  @MinLength(3)
  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
