import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { User } from './modules/users/domains/entity/user.entity';
import { UserLoginsModule } from './modules/user-logins/user-logins.module';
import { UserLogins } from './modules/user-logins/domains/entity/user-logins.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '123456789',
        database: 'db_challenge_ally',
        entities: [User, UserLogins],
        synchronize: true
      }
    ),
    UserModule,
    UserLoginsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
