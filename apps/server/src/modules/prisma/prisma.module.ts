import { Module } from '@nestjs/common'


import { AppService } from '../../app.service';
import { PrismaService } from './prisma.service';



// import { AppController } from './app.controller';

@Module({
  
    providers: [PrismaService],
    exports:[PrismaService]
    
})
export class PrismaModule {}