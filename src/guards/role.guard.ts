import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';

export function RoleG(role: number) {
  return UseGuards(new RoleGuard(role));
}

export class RoleGuard implements CanActivate {
  constructor(private role: number) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user.role >= this.role;
  }
}
