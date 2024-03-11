import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import jwtConfig from "@server/commom/config/jwt.config";
import redisConfig from "@server/commom/config/redis.config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
    imports:[PrismaModule,  
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(redisConfig),
        JwtModule,
        
   
       
        
    ],
    providers: [OrderService],
    controllers:[OrderController],
    exports:[OrderService]
    
})
export class OrderModule {}