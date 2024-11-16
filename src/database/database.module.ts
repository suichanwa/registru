/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createPool } from 'oracledb';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get<string>('ORACLE_HOST'),
        port: configService.get<number>('ORACLE_PORT'),
        username: configService.get<string>('ORACLE_USER'),
        password: configService.get<string>('ORACLE_PASSWORD'),
        serviceName: configService.get<string>('ORACLE_SERVICE_NAME'),
        synchronize: true, // Automatically synchronize schema in development
        entities: [__dirname + '/../entities/*.entity{.ts,.js}'], // Specify the entities folder
      }),
    }),
  ],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        return await createPool({
          user: configService.get<string>('ORACLE_USER'),
          password: configService.get<string>('ORACLE_PASSWORD'),
          connectString: `${configService.get<string>('ORACLE_HOST')}:${configService.get<number>('ORACLE_PORT')}/${configService.get<string>('ORACLE_SERVICE_NAME')}`,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}