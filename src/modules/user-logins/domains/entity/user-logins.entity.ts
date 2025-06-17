import { User } from "src/modules/users/domains/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserLogins {
    
    @PrimaryGeneratedColumn()
    private id: number;

    @CreateDateColumn()
    private loginCreate: Date;

    @Column()
    private ipAdress: string;

    @ManyToOne(() => User, (user) => user.userLogins)
    user: User;
}