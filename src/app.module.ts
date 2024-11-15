/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseTestService } from './database-test/database-test.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DatabaseTestService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dbTestService: DatabaseTestService) {}

  async onModuleInit() {
    await this.dbTestService.testConnection();
  }
}