import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/users/applications/services/user/user.service';
import { User } from 'src/modules/users/domains/entity/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

     async signIn(email: string, pass: string){
        const user: User | null = await this.userService.getUserByEmail(email);

        if(!user){
            throw new UnauthorizedException();
        }

        const isPass = await this.comparePassword(pass, user.password);
        if (!isPass) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, email: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
     }
}
