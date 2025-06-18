import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogins } from '../../domains/entity/user-logins.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/domains/entity/user.entity';
import { CreateUserLogins } from '../../interfaces/dto/create-user-logins.dto';

@Injectable()
export class UserLoginsService {

    constructor(
        @InjectRepository(UserLogins) private userLoginsRepository: Repository<UserLogins>
    ){}

    async createUserLogins(ipAdress: string, user: User){
        const userLogins: CreateUserLogins = {
            ipAdress,
            user
        }

        const newUserLogins: UserLogins = this.userLoginsRepository.create(userLogins);
        return this.userLoginsRepository.save(newUserLogins);
    }
}
