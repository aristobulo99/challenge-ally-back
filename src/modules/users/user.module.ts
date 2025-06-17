import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domains/entity/user.entity";
import { UserService } from './applications/services/user/user.service';
import { UserController } from './interfaces/controllers/user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UserModule {}