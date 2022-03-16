import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatService } from './cat.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private catService: CatService,
  ) {}

  @Get()
  getHello() {
    return {
      isEMTheSame: this.catService.compareEntityManagers(),
    };
  }
}
