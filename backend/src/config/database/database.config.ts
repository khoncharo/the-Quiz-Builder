import { IDataBaseConfig } from './database-config.interface';
import { IsString } from 'class-validator';

export class DatabaseConfig implements IDataBaseConfig {
  @IsString()
  URL: string;
}
