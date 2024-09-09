import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  async create(@Body() createAccessDto: CreateAccessDto) {
    return await this.accessService.create(createAccessDto);
  }

  @Get()
  async findAll() {
    return await this.accessService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accessService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    return await this.accessService.update(id, updateAccessDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accessService.remove(id);
  }
}
