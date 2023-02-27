import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { RolesService } from './roles.service';
import { RolesEnumService } from './enums/roles.enum.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService, RolesEnumService],
})
export class RolesModule {}
