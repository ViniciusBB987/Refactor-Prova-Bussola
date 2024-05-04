import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Curso } from './entities/curso.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { NotFindedStudentsExceptions, StudentNotExists } from 'src/exceptions/notStudent.exception';


@Injectable()
export class CursoService {

  constructor(@InjectModel(Curso.name) private cursoModel: Model<Curso>,
  private userService: UserService
){}

  async create(createCursoDto: CreateCursoDto) {

    if(createCursoDto.alunos.length === 0) {
      throw new NotFindedStudentsExceptions()
    }

    const curso = await this.cursoModel.create(createCursoDto)

    await curso.populate('alunos');

    return curso
  }

  findAll() {
    const findedCurso = this.cursoModel.find()
    return findedCurso
  }

  findOne(id: number) {
    const findedCurso = this.cursoModel.findOne({ id })
    return findedCurso
  }

  findbyName(nome: string) {
    const findedCurso = this.cursoModel.findOne({ nome: nome })
    return findedCurso
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    return await this.cursoModel.findByIdAndUpdate(id, updateCursoDto).exec()
  }

  async remove(id: number) {
    return await this.cursoModel.findByIdAndDelete(id).exec();
  }
}
