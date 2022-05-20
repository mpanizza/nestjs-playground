import { Injectable, NotFoundException } from '@nestjs/common';
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
  
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.repository.create(createRoleDto);
    console.log("Role DTO " + JSON.stringify(createRoleDto) + " | " +JSON.stringify(role) );
    await this.repository.save(role);
    return role;
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.repository.find();
    console.log("Loaded roles: " + JSON.stringify(roles) )
    return roles;
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.repository.findOne(id,  {
      relations: ['users']
    });

    if (!role) {
      throw new NotFoundException(`Role ${id} not found`);
    }

    console.log("Role " + id + " is: " + JSON.stringify(role) )
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>  {
    const role =  await this.repository.findOne(id);
    console.log("DTO  " + JSON.stringify(updateRoleDto));
    role.name = (updateRoleDto.name == undefined) ? role.name : updateRoleDto.name
    console.log(`name ${updateRoleDto.name}`);
    return this.repository.save(role);
  }

  async remove(id: number): Promise<Role> {
    const deletedRole =  await this.repository.findOne(id, {
      relations: ['users']
    });

    if (!deletedRole) {
      throw new NotFoundException(`User ${id} not found`);
    }
    
    await this.repository.delete(id);
    return deletedRole;
  }
}
