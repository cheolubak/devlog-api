import { Module } from '@nestjs/common';

import { AlertService } from './alert.service';

@Module({
  exports: [AlertService],
  providers: [AlertService],
})
export class AlertModule {}
