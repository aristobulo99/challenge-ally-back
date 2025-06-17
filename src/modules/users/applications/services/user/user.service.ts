import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/domains/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/interfaces/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/modules/users/interfaces/dto/user-by-id.dto';

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

    async createUser(createUser: CreateUserDto){
        const user: User | null = await this.getUserByEmail(createUser.email);

        if(user){
            throw new ConflictException('El correo electrónico del usuario ya está registrado')
        }
        createUser.password = await this.hashPassword(createUser.password)
        const newUser = this.userRepository.create(createUser);
        return await this.userRepository.save(newUser);
    }

    async findUserByEmail(email: string){
        const user: User | null = await this.getUserByEmail(email);

        if(!user){
            throw new NotFoundException('El correo electrónico del usuario no existe')
        }
        console.log(user)
        return plainToClass(UserDto, user, {excludeExtraneousValues: true})
    }
}
