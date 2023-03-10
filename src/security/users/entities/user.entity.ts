import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // add your columns here:
  // @Column()
  // name: type;
  // also add the columns to the respective dtos if needed: create-user.dto.ts and update-user.dto.ts

  // this relation is required by the authorization service to work.
  @ManyToMany(() => Role, (role: Role) => role.users)
  roles: Role[];

  // add your relations here:
}
