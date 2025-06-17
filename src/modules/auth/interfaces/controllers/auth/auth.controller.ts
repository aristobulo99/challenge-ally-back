import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../dto/login.dto';
import { AuthService } from 'src/modules/auth/applications/auth/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}
    
    @ApiOperation({summary: 'Autenticación de usuario'})
    @ApiBody({type: LoginDto})
    @Post('login')
    async login(@Body() login: LoginDto){
        return await this.authService.signIn(login.email, login.password);
    }
}
