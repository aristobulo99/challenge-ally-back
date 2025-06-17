import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domains/entity/user.entity";
import { UserService } from './applications/services/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [],
    providers: [UserService],
    exports: []
})
export class UserModule {}