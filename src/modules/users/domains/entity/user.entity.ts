import { UserLogins } from "src/modules/user-logins/domains/entity/user-logins.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    names: string;

    @Column()
    lastNames: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    createDate: Date;

    @Column()
    updateDate: Date;

    @OneToMany(() => UserLogins, (userLogins) => userLogins.user)
    userLogins: UserLogins[]
}