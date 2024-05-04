import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) { }

  async signIn(email: string, senha: string): Promise<any> {
  
    const user = await this.usersService.findOne(email)

    const isMath = await bcrypt.compare(senha, user.senha)

    if (!isMath) throw new UnauthorizedException();

    const payload = { sub: user._id, userMail: user.nome }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }

  }
}