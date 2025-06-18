import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { User } from "src/modules/users/domains/entity/user.entity";

export class CreateUserLogins {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
            example: '::1'
        })
    ipAdress: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    user: User;

    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    loginCreate: Date;
}