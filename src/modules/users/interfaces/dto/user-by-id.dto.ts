import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, MinLength } from "class-validator";
import { Expose } from "class-transformer";

export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        example: 1
    })
    id: number;
    
    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Mon Jun 16 2025 21:15:28 GMT-0500 (hora estándar de Colombia)'
    })
    createDate: Date;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Mon Jun 16 2025 21:15:28 GMT-0500 (hora estándar de Colombia)'
    })
    updateDate: Date;
}