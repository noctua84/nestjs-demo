import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from "../../../security/auth/auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    const user = await this.authService.validateToken(token);

    if (!user) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    if (!await this.authService.checkRoles(user, req)) {
      return res.status(403).json({message: 'Forbidden'});
    }

    // TODO: Add user to request
    // req.user = user;
    next();
  }
}
