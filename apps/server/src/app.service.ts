import { Injectable, UseGuards } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { AccessTokenGuard } from './auth/access-token.guard';

@Injectable()
export class AppService {
  // constructor(private readonly userService:UserService){}
  getHello(name:string): string {
    return name;
  }

  getGoodbye():string{
    return 'Goodbye!';
  }
}
