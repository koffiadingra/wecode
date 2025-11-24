import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers(): string {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    username: string,
    email: string,
    password: string,
    isAdmin = false,
  ): Promise<User> {
    if (password.length < 5) {
      throw new Error('Password must be at least 5 characters !');
    }
    const existingEmail = await this.userModel.findOne({ email }).exec();
    if (existingEmail) {
      throw new Error('Email already in use !');
    }

    const existingUsername = await this.userModel.findOne({ username }).exec();
    if (existingUsername) {
      throw new Error('Username already in use !');
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashed,
      isAdmin,
    });
    try {
      return await newUser.save();
    } catch (error) {
      throw new Error('Impossible to create User.');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select('-password')
      .exec();

    if (!updatedUser) throw new NotFoundException(`User ${id} not found`);
    return updatedUser;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`User ${id} not found`);
    return { message: `User ${id} deleted successfully` };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
