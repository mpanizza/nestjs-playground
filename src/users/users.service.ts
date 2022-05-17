import { Injectable } from '@nestjs/common';
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
  
  async create(createUserDto: CreateUserDto) {
    const roleReq = await this.roleRepository.findOne(createUserDto.roleId,  {
      relations: ['users']
    })
    const user = this.repository.create(createUserDto);
    // user.role = roleReq;
    await this.repository.save(user);
    console.log( "User DTO : "+ (createUserDto instanceof CreateUserDto) + " = " + JSON.stringify(createUserDto));
    console.log( "User object : "+ (user instanceof User) + " = " + JSON.stringify(user));
    console.log( "requested role : "+ (roleReq instanceof Role) + " = " + JSON.stringify(roleReq));
    return 'This action adds a new user' + JSON.stringify(createUserDto);
    ;
  }

  async findAll() {
    const users = await this.repository.find();
    console.log("Loaded users: " + JSON.stringify(users) )
    return users;
  }

  async findOne(id: number) {
    const user =  await this.repository.findOne(id, {
      relations: ['role']
    });
    console.log("User " + id + " is: " + JSON.stringify(user) )
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user =  await this.repository.findOne(id, {
      relations: ['role']
    });
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return `This action removes a #${id} user`;
  }
}
