import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ApiUsageService } from './services/api-usage.service';

@Global()
@Module({
  exports: [ApiUsageService],
  imports: [DatabaseModule],
  providers: [ApiUsageService],
})
export class CommonModule {}
