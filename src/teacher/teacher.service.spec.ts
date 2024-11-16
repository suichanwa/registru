/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from '../entities/teacher.entity';
import { Repository } from 'typeorm';

describe('TeacherService', () => {
  let service: TeacherService;
  let repository: Repository<Teacher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
    repository = module.get<Repository<Teacher>>(getRepositoryToken(Teacher));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all teachers', async () => {
    const teachers = [{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' }];
    jest.spyOn(repository, 'find').mockResolvedValue(teachers);
    expect(await service.findAll()).toEqual(teachers);
  });

  it('should find one teacher by id', async () => {
    const teacher = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(teacher);
    expect(await service.findOne(1)).toEqual(teacher);
  });

  it('should create a teacher', async () => {
    const teacher = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
    jest.spyOn(repository, 'save').mockResolvedValue(teacher);
    expect(await service.create(teacher as Teacher)).toEqual(teacher);
  });

  it('should update a teacher', async () => {
    const teacher = { name: 'John Doe Updated' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    await service.update(1, teacher);
    expect(repository.update).toHaveBeenCalledWith(1, teacher);
  });

  it('should remove a teacher', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});