import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {

    @Expose()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        example: 'JUAN PABLO'
    })
    names: string;
    
    @Expose()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        example: 'LOPEZ PEREZ'
    })
    lastNames: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: 'ejemplo@dominio.com'
    })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({
        example: 'password seguro'
    })
    password: string;
}