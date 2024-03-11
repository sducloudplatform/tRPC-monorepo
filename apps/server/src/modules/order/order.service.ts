import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { FindOrderDto } from "./dto/find-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderDto } from "./dto/order.dto";

@Injectable()
export class OrderService{

    // 通过stateid查询订单信息，返回数组
    async FindByStateid(stateid: number){
        const prisma = new PrismaClient()
        return await prisma.order.findMany({
            where:{
                relation_stateid: stateid
            }
        })
    }

    async UpdateStateByOrderid(orders: OrderDto[]){
        const prisma = new PrismaClient()
        console.log("```````````")
        // console.log(orders)
        return prisma.$transaction(async(tx)=>{
            var ans=[{}]
            for(var i in orders){
                var datenow = new Date(new Date(orders[i].updatetime).getTime()+new Date(orders[i].updatetime).getTimezoneOffset() * -1 * 60* 1000)
                console.log(datenow)
                ans[i]=await prisma.order.update({
                    where:{
                        orderid: orders[i].orderid
                    },
                    data:{
                        relation_stateid: orders[i].stateid,
                        updatetime: datenow 
                    }
                })
                console.log("Finish Update----Order"+i+"----")
            }
            console.log("```````````")
            return ans
        })
        
    }

}