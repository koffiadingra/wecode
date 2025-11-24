import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/ user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { username, email, password, password_confirm } = registerDto;

    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new BadRequestException('Email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async google(payload: { email: string; name: string }) {
    const { email, name } = payload;

    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      // const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await this.userModel.create({
        email,
        username: name,
        password: randomPassword,
      });
    }

    const jwtPayload = {
      email: user.email,
      sub: user._id,
      name: user.username,
    };

    const access_token = this.jwtService.sign(jwtPayload);

    return {
      access_token,
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
      },
    };
  }
}
