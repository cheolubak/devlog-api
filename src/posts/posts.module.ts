import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  exports: [PostsService],
  imports: [DatabaseModule],
  providers: [PostsService],
})
export class PostsModule {}
