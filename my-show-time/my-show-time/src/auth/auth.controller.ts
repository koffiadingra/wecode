import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  Get,
  //   UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.validateUser(email, password);
      req.session.user = {
        _id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      };
      if (user.isAdmin) {
        return res.redirect('/admin');
      } else {
        return res.redirect('/');
      }
    } catch (error) {
      return res.render('auth/login', { error: error.message });
    }
  }
  // res.send({ message: 'Login successful', user: req.session.user });

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }

  @Get('check')
  check(@Req() req: Request) {
    return req.session.user || { message: 'Not log in ' };
  }
}
