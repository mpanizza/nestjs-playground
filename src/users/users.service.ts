import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public readonly repository: Repository<User>,
    @InjectRepository(Role) public readonly roleRepository: Repository<User>,
  ) { }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const roleReq = await this.roleRepository.findOneBy({
      id: createUserDto.roleId
    })
    const user = this.repository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      eMail: createUserDto.eMail,
      role: roleReq
    });
    // user.role = roleReq;
    await this.repository.save(user);
    console.log( "User DTO : "+ (createUserDto instanceof CreateUserDto) + " = " + JSON.stringify(createUserDto));
    console.log( "User object : "+ (user instanceof User) + " = " + JSON.stringify(user));
    console.log( "requested role : "+ (roleReq instanceof Role) + " = " + JSON.stringify(roleReq));
    return user;
  }

  async findAll(): Promise <User[]> {
    const users = await this.repository.find();
    console.log("Loaded users: " + JSON.stringify(users) )
    return users;
  }

  async findOne(id: number): Promise <User> {
    const user =  await this.repository.findOne({
      where: { id: id },
      relations: {role: true}
    }) ;

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    console.log("User " + id + " is: " + JSON.stringify(user) )
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise <User> {
    const user =  await this.repository.findOne( {
      where: { id: id },
      relations: {role: true}
    }); 

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return this.repository
      .update(id, updateUserDto)
      .then(() => this.repository.findOne({
        where: { id: id },
        relations: {role: true}  
      }));
}

  async remove(id: number): Promise<User> {
    const deletedUser =  await this.repository.findOne({
      where: { id: id },
      relations: {role: true}  
  });

    if (!deletedUser) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.repository.delete(id);
    return deletedUser;
  }
}
