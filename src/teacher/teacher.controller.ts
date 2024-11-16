/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { Teacher } from '../entities/teacher.entity';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({ status: 200, description: 'Return all teachers.' })
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID' })
  @ApiResponse({ status: 200, description: 'Return a teacher.' })
  async findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiResponse({ status: 201, description: 'The teacher has been successfully created.' })
  async create(@Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a teacher' })
  @ApiResponse({ status: 200, description: 'The teacher has been successfully updated.' })
  async update(@Param('id') id: number, @Body() teacher: Partial<Teacher>): Promise<void> {
    await this.teacherService.update(id, teacher);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiResponse({ status: 200, description: 'The teacher has been successfully deleted.' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.teacherService.remove(id);
  }
}