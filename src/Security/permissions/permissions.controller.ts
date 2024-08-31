import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

    @Post()
    async create(@Body() createPermissionDto: CreatePermissionDto) {
        return await this.permissionsService.create(createPermissionDto);
    }

    @Get()
    async findAll() {
        return await this.permissionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.permissionsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return await this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.permissionsService.remove(id);
    }
}