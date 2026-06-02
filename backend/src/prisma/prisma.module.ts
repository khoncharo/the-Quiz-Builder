import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DatabaseConfigService } from '../config/database/database-config.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseConfigService],
  exports: [PrismaService],
})
export class PrismaModule {}
