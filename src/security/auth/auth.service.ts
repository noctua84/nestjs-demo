import { Injectable } from '@nestjs/common';
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor() {}

  async validateToken(token: string): Promise<User> {
    // TODO: Implement token validation ((JWT) -> passport) and return the user object
    let valid: boolean = false;

    if (valid) {
      // TODO: Get user from database
    }
    else {
      return null;
    }
  }

  async checkRoles(user: User, req: any): Promise<boolean> {
    const requiredRoles = req.metadata.roles;

    if(!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role: string) => {
      const userRoles = user.roles.map((role) => role.name);
      return userRoles.includes(role);
    });
  }
}
