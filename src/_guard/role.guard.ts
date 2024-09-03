import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY, Role } from 'src/_decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private reflector: Reflector ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  
    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRole === user.type;
  }
}
