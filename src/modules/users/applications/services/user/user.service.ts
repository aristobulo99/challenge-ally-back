import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/domains/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/interfaces/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/modules/users/interfaces/dto/user-by-id.dto';
import { UserLoginsData } from 'src/modules/user-logins/interfaces/dto/user-logins.dto';

@Injectable()
export class UserService {

    private saltRounds: number = 10;

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async getUserByEmail(email: string){
        return await this.userRepository.findOne(
            {
                where: {email}
            }
        )
    }

    async getUserByEmailWithLastLogin(email: string){
        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.userLogins', 'userLogins')
            .where('user.email = :email', { email })
            .orderBy('userLogins.loginCreate', 'DESC')
            .limit(1)
            .getOne();
    }

    async getAllUsersWithLastLogin(){
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userLogins', 'userLogins')
            .orderBy('userLogins.loginCreate', 'DESC')
            .getMany();
    }

    async createUser(createUser: CreateUserDto){
        const user: User | null = await this.getUserByEmail(createUser.email);

        if(user){
            throw new ConflictException('El correo electrónico del usuario ya está registrado')
        }
        createUser.password = await this.hashPassword(createUser.password);
        const newUser = this.userRepository.create(createUser);
        const currentDate: Date = new Date();
        newUser.createDate = currentDate;
        newUser.updateDate = currentDate;
        return await this.userRepository.save(newUser);
    }

    async findUserByEmail(email: string){
        const user: User | null = await this.getUserByEmailWithLastLogin(email);

        if(!user){
            throw new NotFoundException('El correo electrónico del usuario no existe')
        }
        const [lastLogin] = user.userLogins ?? [];
        const lastLoginDto = plainToClass(UserLoginsData, lastLogin, {excludeExtraneousValues: true,});

        const userWithLastLogin = { ...user, userLogins: lastLoginDto };
        return plainToClass(UserDto, userWithLastLogin, {excludeExtraneousValues: true})
    }

    async findAllUset(){
        const users: User[]  = await this.getAllUsersWithLastLogin();
        return users.map<UserDto>(us => {
            const [lastLogin] = us.userLogins ?? [];
            const lastLoginDto = plainToClass(UserLoginsData, lastLogin, {excludeExtraneousValues: true,});

            const userWithLastLogin = { ...us, userLogins: lastLoginDto };
            return plainToClass(UserDto, userWithLastLogin, {excludeExtraneousValues: true})
        })
    }
}
