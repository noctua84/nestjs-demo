import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findALl(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async addRole(createRoleDto: CreateRoleDto) {
    await this.rolesRepository.save(createRoleDto);
  }

  async removeRole(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
