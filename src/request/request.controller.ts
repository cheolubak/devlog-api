import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { UsersGuard } from '../auth/users.guard';
import { RequestDto } from './dto/request.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('blogs')
  @UseGuards(UsersGuard)
  async requestBlog(@Req() req, @Body() dto: RequestDto) {
    const user = req.user;

    return this.requestService.requestBlogs({ dto, user });
  }

  @Post('youtubes')
  @UseGuards(UsersGuard)
  async requestYoutubes(@Req() req, @Body() dto: RequestDto) {
    const user = req.user;

    return this.requestService.requestYoutubes({ dto, user });
  }
}
