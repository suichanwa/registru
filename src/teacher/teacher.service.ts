/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({ where: { id } });
  }

  async create(teacher: Teacher): Promise<Teacher> {
    return this.teacherRepository.save(teacher);
  }

  async update(id: number, teacher: Partial<Teacher>): Promise<void> {
    await this.teacherRepository.update(id, teacher);
  }

  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
