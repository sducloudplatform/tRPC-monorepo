import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { FindOrderDto } from './dto/find-order.dto';
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderDto } from "./dto/order.dto";

@Controller('order')
export class OrderController{
    constructor(
        private readonly orderService: OrderService
    ){  }

    @Post('findStateOrder')
    async findStateOrder(@Body() stateid: number){
        const StateOrder = await this.orderService.FindByStateid(stateid)
        console.log(StateOrder)
        return StateOrder
    }

    @Post('findUnAuditOrder')
    async findUnAuditOrder(){
        const UnAuditOrder = await this.orderService.FindByStateid(1)
        console.log("查询未审核订单")
        return UnAuditOrder
    }

    @Post('AuditingOrder')
    async AuditingOrder(@Body() orders: OrderDto[]){
        // console.log(orders)
        return await this.orderService.UpdateStateByOrderid(orders)
    }

}