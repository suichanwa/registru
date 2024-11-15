/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseTestService {
  constructor(@Inject('DATABASE_CONNECTION') private dbConnection: any) {}

  async testConnection() {
    try {
      const connection = await this.dbConnection.getConnection();
      const result = await connection.execute('SELECT 1 FROM DUAL');
      console.log('Connection test result:', result);
      connection.close();
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
