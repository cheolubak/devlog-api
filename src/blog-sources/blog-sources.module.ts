import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ImageParseModule } from '../image-parse/image-parse.module';
import { BlogSourcesController } from './blog-sources.controller';
import { BlogSourcesService } from './blog-sources.service';

@Module({
  controllers: [BlogSourcesController],
  exports: [BlogSourcesService],
  imports: [DatabaseModule, ImageParseModule],
  providers: [BlogSourcesService],
})
export class BlogSourcesModule {}
