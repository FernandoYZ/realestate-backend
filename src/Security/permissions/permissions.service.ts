import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { DataConflict, DataNotFound } from 'src/app.exception';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<{permission: Permission, message: string }> {
    const existingPermission = await this.permissionModel.findOne({ 
        module: createPermissionDto.module 
    });
    DataConflict('Permiso', existingPermission)
    const newPermission = new this.permissionModel(createPermissionDto);
    const savePermission = await newPermission.save();
    return {permission: savePermission, message: "Permiso agregado con éxito"};
  }

  async findAll(): Promise<Permission[]> {
      return await this.permissionModel.find().exec();
  }

  async findOne(id: string): Promise<Permission> {
      const permission = await this.permissionModel.findById(id).lean().exec();
      DataNotFound('Permiso', permission)
      return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
      const updatedPermission = await this.permissionModel.findByIdAndUpdate(
          id, 
          updatePermissionDto, 
          { new: true },
      ).exec();

      DataNotFound('Permiso', updatedPermission);

      return updatedPermission;
  }

  async remove(id: string): Promise<{ permission: Permission; message: string }> {
      const deletedPermission = await this.permissionModel.findByIdAndDelete(id).exec();
      DataNotFound('Permiso', deletedPermission);
      return { permission:deletedPermission, message: 'Permiso eliminado exitosamente' };
  }
}
