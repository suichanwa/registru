/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Change `time` to `timestamp` or `date`
  @Column({ type: 'timestamp' }) 
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;
}
