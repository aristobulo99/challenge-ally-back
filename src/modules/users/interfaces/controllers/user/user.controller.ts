import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/users/applications/services/user/user.service';
import { CreateUserDto } from '../../dto/create-user.dto';

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
}
