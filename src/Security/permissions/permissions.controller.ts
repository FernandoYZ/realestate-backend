import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './permissions.service';
import { CreateRoleDto } from './dto/create-permission.dto';
import { UpdateRoleDto } from './dto/update-permission.dto';

@Controller('roles')
export class permissionsController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createpermissionDto: CreatepermissionDto) {
    return this.permissionsService.create(createpermissionDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.permissionsService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
