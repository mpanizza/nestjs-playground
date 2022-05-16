import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) public readonly repository: Repository<Role>,
    @InjectRepository(User) public readonly userRepository: Repository<User>,
  ) {}
  
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    const roles = await this.repository.find();
    console.log("Loaded roles: " + JSON.stringify(roles) )
    return roles;
  }

  async findOne(id: number) {
    const role = await this.repository.findOne(id,  {
      relations: ['users']
    });
    console.log("Role " + id + " is: " + JSON.stringify(role) )
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
