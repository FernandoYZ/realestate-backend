import { Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Access, AccessDocument } from './schemas/access.schema';
import { Model } from 'mongoose';
import { DataConflict, DataNotFound } from 'src/app.exception';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel(Access.name) private accessModel: Model<AccessDocument>
  ) {}

  async create(createAccessDto: CreateAccessDto): Promise<{ data: Access, message: string }> {
    // Verificar si el acceso ya existe
    const verificarAccess = await this.accessModel.findOne({
      role: createAccessDto.role,
    });
    DataConflict('Acceso', verificarAccess);

    const crearAcceso = new this.accessModel(createAccessDto);
    const guardarAcceso = await crearAcceso.save();
    
    return {
      data: guardarAcceso,
      message: 'Acceso agregado con éxito!!!',
    };
  }

  async findAll(): Promise<{ data: Access[], message: string }> {
    const accesos = await this.accessModel
      .find()
      .populate('role permissions')
      .exec();
      
    DataNotFound('Accesos', accesos);
    
    return {
      data: accesos,
      message: 'Accesos obtenidos con éxito',
    };
  }

  async findOne(id: string): Promise<{ data: Access, message: string }> {
    const acceso = await this.accessModel
      .findById(id)
      .populate('role permissions')
      .exec();

    DataNotFound('Acceso', acceso);
    
    return {
      data: acceso,
      message: `Acceso con ID ${id} obtenido con éxito`,
    };
  }

  async update(id: string, updateAccessDto: UpdateAccessDto): Promise<{ data: Access, message: string }> {
    const actualizarAcceso = await this.accessModel
      .findByIdAndUpdate(id, updateAccessDto, { new: true })
      .populate('role permissions')
      .exec();

    DataNotFound('Acceso', actualizarAcceso);
    
    return {
      data: actualizarAcceso,
      message: `Acceso con ID ${id} actualizado con éxito`,
    };
  }

  async remove(id: string): Promise<{ data: Access, message: string }> {
    const eliminarAcceso = await this.accessModel
      .findByIdAndDelete(id)
      .exec();

    DataNotFound('Acceso', eliminarAcceso);
    
    return {
      data: eliminarAcceso,
      message: `Acceso con ID ${id} eliminado con éxito`,
    };
  }
}
