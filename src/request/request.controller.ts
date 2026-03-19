import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersGuard } from '../auth/users.guard';
import { ApiZodBody } from '../common/decorators/api-zod.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Users } from '../database/generated/prisma/client';
import { RequestDto, requestSchema } from './dto/request.dto';
import { RequestService } from './request.service';

@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({ summary: '블로그 등록 요청' })
  @ApiZodBody(requestSchema)
  @Post('blogs')
  @UseGuards(UsersGuard)
  async requestBlog(
    @Req() req: Request & { user?: Users },
    @Body(new ZodValidationPipe(requestSchema)) dto: RequestDto,
  ) {
    const user = req.user;

    return this.requestService.requestBlogs({ dto, user });
  }

  @ApiOperation({ summary: '유튜브 등록 요청' })
  @ApiZodBody(requestSchema)
  @Post('youtubes')
  @UseGuards(UsersGuard)
  async requestYoutubes(
    @Req() req: Request & { user?: Users },
    @Body(new ZodValidationPipe(requestSchema)) dto: RequestDto,
  ) {
    const user = req.user;

    return this.requestService.requestYoutubes({ dto, user });
  }
}
