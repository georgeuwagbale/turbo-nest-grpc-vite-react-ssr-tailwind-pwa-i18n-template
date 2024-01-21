import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import DisplayUsers from '../../users-demo-frontend/src/components/DisplayUsers';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
