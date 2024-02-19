import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/access-token.guard';

@Controller()
@UseGuards(AccessTokenGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello('xiaoming');
  }
}
