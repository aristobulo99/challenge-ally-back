import { Module } from "@nestjs/common";
import { UserLoginsService } from './applications/user-logins/user-logins.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserLogins } from "./domains/entity/user-logins.entity";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([UserLogins])
        ],
        controllers: [],
        providers: [UserLoginsService],
        exports: [UserLoginsService]
    }
) export class UserLoginsModule {}