import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './applications/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './interfaces/controllers/auth/auth.controller';
import { UserLoginsModule } from '../user-logins/user-logins.module';

@Module({
    imports: [
        UserModule,
        UserLoginsModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '30m'}
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
