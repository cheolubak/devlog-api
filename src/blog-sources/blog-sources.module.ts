import { Module } from '@nestjs/common';
import { BlogSourcesService } from './blog-sources.service';
import { BlogSourcesController } from './blog-sources.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogSourcesController],
  providers: [BlogSourcesService],
  exports: [BlogSourcesService],
})
export class BlogSourcesModule {}
