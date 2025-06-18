import { User } from "src/modules/users/domains/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserLogins {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    loginCreate: Date;

    @Column()
    ipAdress: string;

    @ManyToOne(() => User, (user) => user.userLogins)
    user: User;
}