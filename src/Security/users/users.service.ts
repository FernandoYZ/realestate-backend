import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { DataBadRequest, DataConflict, DataNotFound } from 'src/app.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<{ data:User, message: string }> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    DataConflict('Usuario', existingUser);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const guardarUser = await newUser.save();

    return {
      data: guardarUser,
      message: 'Usuario agregado con éxito'
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll():Promise<User[]> {
    const user = await this.userModel
      .find()
      .populate('access')
      .exec()
    DataBadRequest('Usuario', user);
    DataNotFound('Usuario', user);
    return user;
  }

  async findOne(id: string):Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('access')
      .exec();
    DataNotFound('Usuario', user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<{ data: User, message: string }> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate('access')
      .exec();
    DataNotFound('Usuario', updatedUser);
    return {
      data:updatedUser,
      message: 'Usuario registrado con éxito'
    };
  }

  async remove(id: string):Promise<{ data: User, message: string }> {
    const deletedUser = await this.userModel
      .findByIdAndDelete(id)
      .exec();
    DataNotFound('Usuario', deletedUser)
    return { 
      data: deletedUser,
      message: 'Usuario Eliminado con éxito' 
    };
  }
}