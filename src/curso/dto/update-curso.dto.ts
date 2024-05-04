import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { IsArray, IsDecimal, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/user/entities/user.schema';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    nome: string

    @IsDecimal()
    @IsNotEmpty()
    valor: string

    @IsInt()
    duracao: number

    @IsArray()
    @IsNotEmpty()
    alunos: Array<User>

    
}
