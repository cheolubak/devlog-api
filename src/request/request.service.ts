import { Injectable } from '@nestjs/common';

import { AlertService } from '../alert/alert.service';
import { Users } from '../database/generated/prisma';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class RequestService {
  constructor(private readonly alertService: AlertService) {}

  async requestBlogs({ dto, user }: { dto: RequestDto; user?: Users }) {
    await this.alertService.sendAlert(
      `블로그 포스 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    );

    return true;
  }

  async requestYoutubes({ dto, user }: { dto: RequestDto; user?: Users }) {
    await this.alertService.sendAlert(
      `유튜브 채널 요청 : ${dto.url} | 요청 이메일 : ${dto.email} | 사용자 ID : ${user?.id ?? 'UNKNOWN'}`,
    );

    return true;
  }
}
