import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/users/applications/services/user/user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { AuthGuard } from 'src/core/guard/auth/auth.guard';

@ApiTags('Usuario')
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @ApiOperation({summary: 'Agregar un nueo usuario'})
    @Post('/add-user')
    @ApiBody({type: CreateUserDto})
    async createUser(@Body() createUser: CreateUserDto){
        return await this.userService.createUser(createUser);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Obtener el usuario por el correo electrónico'})
    @Get('/by-email/:email')
    async getUserByEmail(@Param('email') email: string){
        return await this.userService.findUserByEmail(email);
    }
}
