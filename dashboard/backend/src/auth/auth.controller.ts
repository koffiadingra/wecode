import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('google')
  async google(@Body() body: { email: string; name: string }) {
    const { email, name } = body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (!name) {
      throw new BadRequestException('Name is required');
    }

    return this.authService.google({ email, name });
  }
}
