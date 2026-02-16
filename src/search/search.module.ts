import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  imports: [DatabaseModule],
  providers: [SearchService],
})
export class SearchModule {}
