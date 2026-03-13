import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ImageParseModule } from '../image-parse/image-parse.module';
import { AdminGuard } from './admin.guard';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersGuard } from './users.guard';

@Module({
  controllers: [AuthController],
  exports: [AuthService, AdminGuard, AuthGuard, UsersGuard],
  imports: [DatabaseModule, HttpModule, ImageParseModule],
  providers: [AuthService, AdminGuard, AuthGuard, UsersGuard],
})
export class AuthModule {}
