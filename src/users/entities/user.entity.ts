import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne
 } from "typeorm"
 
 import { Role } from "../../roles/entities/role.entity"
 
 @Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName: string

    @Column()
    lastName: string
	
    @Column({
       nullable: true
    })
    eMail: string

    @ManyToOne(() => Role, (role) => role.users)
    role: Role


}
