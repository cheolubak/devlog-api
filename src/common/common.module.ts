import { Global, Module } from '@nestjs/common';

import { ApiUsageService } from './services/api-usage.service';

@Global()
@Module({
  exports: [ApiUsageService],
  providers: [ApiUsageService],
})
export class CommonModule {}
