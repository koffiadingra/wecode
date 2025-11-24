import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

Injectable();
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.session?.user;

    if (!user || !user.isAdmin) {
      throw new ForbiddenException('Accès only for admin !!! Dégage');
    }
    return true;
  }
}
