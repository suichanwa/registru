/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from '../entities/teacher.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Post()
  async create(@Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() teacher: Partial<Teacher>): Promise<void> {
    await this.teacherService.update(id, teacher);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.teacherService.remove(id);
  }
}
