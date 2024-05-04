import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.senha = await this.userHash(createUserDto.senha)

    const user = await this.userModel.create(createUserDto)

    return user
  }

  findOne(email: string) {
    const findedUser = this.userModel.findOne({ email: email })
    return findedUser
  }

  findOneId(id: string) {
    const findedUser = this.userModel.findOne({ _id: id })
    return findedUser
  }

  findAll() {
    const findedUsers = this.userModel.find().select("-senha")
    return findedUsers
  }

  private async userHash(pass) {
    const saltOrRounds = 10
    const hashedPass = await bcrypt.hash(pass, saltOrRounds)
    return hashedPass
  }

  async update(id: string, updateCursoDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateCursoDto).exec()
  }

  async remove(id: string) {
   
    return await this.userModel.findByIdAndDelete(id).exec();

    
    
  }
}