import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { BlogSourcesController } from './blog-sources.controller';
import { BlogSourcesService } from './blog-sources.service';

@Module({
  controllers: [BlogSourcesController],
  exports: [BlogSourcesService],
  imports: [DatabaseModule],
  providers: [BlogSourcesService],
})
export class BlogSourcesModule {}
