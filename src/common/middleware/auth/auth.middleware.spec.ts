import { AuthMiddleware } from './auth.middleware';
import { AuthService } from "../../../security/auth/auth.service";

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;

  beforeEach(() => {
    const service = new AuthService();
    middleware = new AuthMiddleware(service);
  });

  describe('create middleware instance', () => {
    it('should be defined', () => {
      expect(middleware).toBeDefined();
    });
  });


});
