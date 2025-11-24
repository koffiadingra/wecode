import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Res,
  Redirect,
  UseGuards,
  // Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import type { Response } from 'express';
import { SessionGuard } from 'src/auth/session.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirm_password') confirm_password: string,
    @Res() res: Response,
    @Body('isAdmin') isAdmin?: boolean,
  ) {
    try {
      const cleanUsername = username?.trim();
      const cleanEmail = email?.trim();

      if (!cleanUsername || cleanUsername.length < 4) {
        return res.render('auth/register', {
          error: 'Username is required and must be at least 3 characters.',
        });
      }

      if (!cleanEmail || !cleanEmail.includes('@')) {
        return res.render('auth/register', {
          error: 'Valid email is required.',
        });
      }

      if (password != confirm_password) {
        return res.render('auth/register', { error: 'Password do not match.' });
      }
      const user = await this.usersService.create(
        username,
        email,
        password,
        isAdmin ?? false,
      );
      return res.redirect('/login');
    } catch (error) {
      return res.render('auth/register', { error: error.message });
    }

    // return user;
  }
  @UseGuards(SessionGuard, AdminGuard)
  @Post('add')
  async add_register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('confirm_password') confirm_password: string,
    @Res() res: Response,
    @Body('isAdmin') isAdmin?: boolean,
  ) {
    try {
      const cleanUsername = username?.trim();
      const cleanEmail = email?.trim();

      if (!cleanUsername || cleanUsername.length < 4) {
        return res.render('auth/register', {
          error: 'Username is required and must be at least 3 characters.',
        });
      }

      if (!cleanEmail || !cleanEmail.includes('@')) {
        return res.render('auth/register', {
          error: 'Valid email is required.',
        });
      }
      if (password != confirm_password) {
        return res.render('auth/register', { error: 'Password do not match.' });
      }
      const user = await this.usersService.create(
        username,
        email,
        password,
        isAdmin ?? false,
      );
      return res.redirect('/admin');
    } catch (error) {
      return res.render('add_users', { error: error.message });
    }
    

    // return user;
  }
  

  @UseGuards(SessionGuard, AdminGuard)
  @Get()
  // @Render('index')
  async getAllUsers() {
    const user = await this.usersService.findAll();
    return { user: user };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // @Put(':id')
  // async replaceUser(
  //   @Param('id') id: string,
  //   @Body() updateData: Partial<User>,
  // ) {
  //   return this.usersService.update(id, updateData);
  // }
  @Post(':id/update')
async updateProfile(
  @Param('id') id: string,
  @Body('username') username: string,
  @Body('email') email: string,
  @Body('password') password: string,
  @Body('confirm_password') confirm_password: string,
  @Res() res: Response,
) {
  try {
    const updateData: any = { username, email };

    if (password) {
      if (password !== confirm_password) {
        const user = await this.usersService.findById(id);
        return res.render('profile/edit', {
          user,
          error: 'Passwords do not match',
        });
      }
      if (password.length < 5) {
        const user = await this.usersService.findById(id);
        return res.render('profile/edit', {
          user,
          error: 'Password must be at least 5 characters',
        });
      }
      updateData.password = password;
    }

    await this.usersService.update(id, updateData);
    const user = await this.usersService.findById(id);
    return res.render('profile/edit', {
      user,
      success: 'Profile updated successfully!',
    });
  } catch (error) {
    const user = await this.usersService.findById(id);
    return res.render('profile/edit', {
      user,
      error: error.message,
    });
  }
}

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.usersService.update(id, updateData);
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Post(':id')
  @Redirect('/admin')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
