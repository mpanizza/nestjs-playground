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
    const user = this.repository.create(createUserDto);
    await this.repository.save(user);
    console.log("User DTO " + JSON.stringify(createUserDto) + " | " +JSON.stringify(user) );
    return 'This action adds a new user' + JSON.stringify(createUserDto);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
