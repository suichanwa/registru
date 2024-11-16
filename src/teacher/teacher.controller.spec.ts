/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from '../entities/teacher.entity';

describe('TeacherController', () => {
  let controller: TeacherController;
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' }),
            create: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' }),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all teachers', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' }]);
  });

  it('should find one teacher by id', async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' });
  });

  it('should create a teacher', async () => {
    const teacher: Teacher = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
    expect(await controller.create(teacher)).toEqual(teacher);
  });

  it('should update a teacher', async () => {
    const teacher: Partial<Teacher> = { name: 'John Doe Updated' };
    await controller.update(1, teacher);
    expect(service.update).toHaveBeenCalledWith(1, teacher);
  });

  it('should remove a teacher', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});