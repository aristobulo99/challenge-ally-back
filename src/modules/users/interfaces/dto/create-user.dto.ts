import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        example: 'JUAN PABLO'
    })
    names: string;
    
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        example: 'LOPEZ PEREZ'
    })
    lastNames: string;

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