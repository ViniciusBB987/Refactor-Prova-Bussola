import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { User } from 'src/user/entities/user.schema'
import * as mongoose from 'mongoose'

export type CursoDocument = HydratedDocument<Curso>

@Schema({timestamps: true})
export class Curso {

    @Prop({ required: true })
    nome: string

    @Prop({ required: true })
    valor: string

    @Prop({required: true})
    duracao: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    alunos: User
}

export const CursoSchema = SchemaFactory.createForClass(Curso)