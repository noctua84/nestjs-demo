import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";

describe('RolesService', () => {
  let rolesService: RolesService;
  let rolesRepository: Repository<Role>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, { provide: getRepositoryToken(Role), useClass: Repository }],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);
    rolesRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  describe('Define service and repository', () => {
    it('should define a service', () => {
      expect(rolesService).toBeDefined();
    });

    it('should define a repository', () => {
      expect(rolesRepository).toBeDefined();
    });
  });

  describe('Method: findALl', () => {
    it('should return an array of roles', async () => {
      const role1 = new Role();
      role1.name = 'Role 1';
      const role2 = new Role();
      role2.name = 'Role 2';
      const roles = [role1, role2];
      jest.spyOn(rolesRepository, 'find').mockResolvedValue(roles);

      const result = await rolesService.findALl();

      expect(result).toEqual(roles);
      expect(rolesRepository.find).toHaveBeenCalled();
    });

    it('should return an empty array if there are no roles', async () => {
      jest.spyOn(rolesRepository, 'find').mockResolvedValue([]);

      const result = await rolesService.findALl();

      expect(result).toEqual([]);
      expect(rolesRepository.find).toHaveBeenCalled();
    });
  });

  describe('Method: addRole', () => {
    it('should add a new role', async () => {
      const createRoleDto: CreateRoleDto = {
        name: 'Role 1',
      };
      jest.spyOn(rolesRepository, 'save').mockResolvedValue(undefined);

      await rolesService.addRole(createRoleDto);

      expect(rolesRepository.save).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('Method: removeRole', () => {
    it('should remove a role', async () => {
      const roleId = 1;
      jest.spyOn(rolesRepository, 'delete').mockResolvedValue(undefined);

      await rolesService.removeRole(roleId);

      expect(rolesRepository.delete).toHaveBeenCalledWith(roleId);
    });

    it('should throw an error if the role does not exist', async () => {
      const roleId = 1;
      jest.spyOn(rolesRepository, 'delete').mockRejectedValue(new Error('Role not found'));

      await expect(rolesService.removeRole(roleId)).rejects.toThrow('Role not found');
      expect(rolesRepository.delete).toHaveBeenCalledWith(roleId);
    });
  });

});
