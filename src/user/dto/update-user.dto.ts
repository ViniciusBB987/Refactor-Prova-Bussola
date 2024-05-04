import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    nome: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    sobrenome: string

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    senha: string

}
