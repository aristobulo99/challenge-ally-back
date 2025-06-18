import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class UserLoginsData {
    
    @Expose()
    @IsNotEmpty()
    @ApiProperty({example: 'Mon Jun 16 2025 21:15:28 GMT-0500 (hora estándar de Colombia)'})
    loginCreate: Date;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({example: '::1'})
    ipAdress: string;
}