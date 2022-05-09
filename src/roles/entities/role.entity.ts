import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    JoinColumn,
    OneToMany
 } from "typeorm"
 
 import { User } from "../../users/entities/user.entity"
 
 @Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => User, (user) => user.role) 
    users: User[]

}
