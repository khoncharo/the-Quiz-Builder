import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { IDataBaseConfig } from './database-config.interface';
import { validateEnvConfig } from '../validate-config';
import { DatabaseConfig } from './database.config';

@Injectable()
export class DatabaseConfigService {
  readonly config: IDataBaseConfig;

  constructor() {
    this.config = this.initialize();
  }

  private initialize(): IDataBaseConfig {
    const envValues = {
      URL: process.env.DATABASE_URL,
    };

    const databaseConfig = validateEnvConfig(DatabaseConfig, envValues);

    return databaseConfig;
  }
}
