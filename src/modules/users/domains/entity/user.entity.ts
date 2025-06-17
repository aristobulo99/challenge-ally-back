import { UserLogins } from "src/modules/user-logins/domains/entity/user-logins.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private names: string;

    @Column()
    private lastNames: string;

    @Column()
    private email: string;

    @Column()
    private password: string;

    @CreateDateColumn()
    private createDate: Date;

    @CreateDateColumn()
    private updateDate: Date;

    @OneToMany(() => UserLogins, (userLogins) => userLogins.user)
    userLogins: UserLogins[]
}