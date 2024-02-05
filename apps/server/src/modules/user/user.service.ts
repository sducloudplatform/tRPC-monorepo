import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaClient } from "@prisma/client";
import { FindUserDto } from "./dto/find-user.dto";

@Injectable()
export class UserService{
    // 创建用户
    async Create(createUserDto: CreateUserDto) {
        const prisma = new PrismaClient()
        return await prisma.user.create({data:createUserDto});
    }
    // 通过username查找用户 用于验证唯一性  返回的是数组
    async FindUserByUsername(findUserDto: FindUserDto){
        const prisma = new PrismaClient()
        return await prisma.user.findMany({
            where:{
                username: findUserDto.username
            }
        })
    }
    // 通过username，password查找用户  用于登录  返回的是数组
    async FindUserByAll(findUserDto: FindUserDto){
        const prisma = new PrismaClient()
        return await prisma.user.findMany({
            where:{
                username: findUserDto.username,
                password: findUserDto.password
            }
        })
    }

    async FindOneByUsername(username:string){
        const prisma = new PrismaClient()
        return await prisma.user.findFirst({
            where:{
                username:username
            }
        }
        
        )
    }
 

}

