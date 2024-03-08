import { VerificationCodeService } from "./verificationcode.service";
import { Module } from '@nestjs/common';


@Module({

    imports:[],
    providers:[VerificationCodeService],
    exports:[VerificationCodeService],


})
export class verificationCodeModule{}