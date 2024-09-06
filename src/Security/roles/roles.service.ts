import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { Model } from 'mongoose';
import { AppConflict, AppNotFound, DataNotFound } from 'src/app.exception';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) 
  {}
  async create(createRoleDto: CreateRoleDto): Promise<{ role: Role, message: string }> {
    const existingRole = await this.roleModel.findOne({
      name: createRoleDto.name
    });

    if (existingRole) {
      throw new AppConflict('Role');
    }

    const newRole = new this.roleModel(createRoleDto);
    const saveRole = await newRole.save();
    return {
      role: saveRole,
      message: "Nuevo role agregado con éxito!"
    }
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find();
    // return await this.roleModel.find().exec(); //Por si se quiere evitar los datos creado por MongoDB
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).lean().exec();
    if(!role) {
      throw new AppNotFound('Rol')
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updatedRole = await this.roleModel.findByIdAndUpdate(
      id,
      updateRoleDto,
      { new: true },
    ).exec()

    DataNotFound('Rol', updatedRole);

    return updatedRole;
  }

  async remove(id: string): Promise<{ data:Role, message:string}> {
    const deletedRole = await this.roleModel.findByIdAndDelete(id).exec();
    DataNotFound('Rol',deletedRole);
    return {
      data: deletedRole,
      message: "El rol ha sido eliminado con éxito!" 
    };
  }
}

  
