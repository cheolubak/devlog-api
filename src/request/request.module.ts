import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  controllers: [RequestController],
  imports: [AuthModule, DatabaseModule, HttpModule],
  providers: [RequestService],
})
export class RequestModule {}
