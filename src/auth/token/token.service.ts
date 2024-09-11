import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/security/users/schemas/user.schema';
import { Token, TokenDocument } from './schemas/token.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Guardar el token sin la IP
  async saveToken(userId: string, token: string, expiresAt?: Date) {
    const hashedToken = await bcrypt.hash(token, 10);
    return this.tokenModel.create({ user: userId, token: hashedToken, expiresAt });
  }

  // Añadir IP si no existe en el usuario
  async addIpIfNotExists(userId: string, ip: string) {
    const user = await this.userModel.findById(userId);
    if (user) {
      if (!user.ips.includes(ip)) {
        if (user.ips.length >= 3) {
          await this.notifyIpLimitReached(userId);
        }
        user.ips.push(ip);
        await user.save();
      }
    }
  }

  async notifyIpLimitReached(userId: string) {
    // Implementa la lógica para notificar al usuario y al superadmin
  }

  async findToken(token: string) {
    const hashedToken = await bcrypt.hash(token, 10);
    return this.tokenModel.findOne({ token: hashedToken });
  }

  async deleteToken(token: string) {
    const hashedToken = await bcrypt.hash(token, 10);
    return this.tokenModel.deleteOne({ token: hashedToken });
  }
}
