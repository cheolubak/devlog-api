import { Injectable, Logger } from '@nestjs/common';

import { AlertService } from '../alert/alert.service';
import { Users } from '../database/generated/prisma/client';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(private readonly alertService: AlertService) {}

  async requestBlogs({ dto, user }: { dto: RequestDto; user?: Users }) {
    this.logger.log(
      `블로그 포스 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    );

    await this.alertService.sendAlert(
      `블로그 포스 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    );

    return true;
  }

  async requestYoutubes({ dto, user }: { dto: RequestDto; user?: Users }) {
    this.logger.log(
      `유튜브 채널 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    );

    await this.alertService.sendAlert(
      `유튜브 채널 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    );

    return true;
  }
}
