import { Module } from '@nestjs/common';

import { TranslateService } from './translate.service';

@Module({
  exports: [TranslateService],
  providers: [TranslateService],
})
export class TranslateModule {}
