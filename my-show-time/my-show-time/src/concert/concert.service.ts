import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert, ConcertDocument } from './schemas/Concert.shema';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel(Concert.name) private ConcertModel: Model<ConcertDocument>,
  ) {}

  async create(createConcertDto: CreateConcertDto) {
    const createdConcert = new this.ConcertModel(createConcertDto);
    return createdConcert.save();
  }

  async findAll() {
    return this.ConcertModel.find().exec();
  }

  async findOne(id: string) {
    const Concert = await this.ConcertModel.findById(id).exec();
    if (!Concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return Concert;
  }

  async update(id: string, updateConcertDto: UpdateConcertDto) {
    const Concert = await this.ConcertModel.findByIdAndUpdate(
      id,
      updateConcertDto,
      { new: true },
    ).exec();
    if (!Concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return Concert;
  }

  async remove(id: string) {
    const Concert = await this.ConcertModel.findByIdAndDelete(id).exec();
    if (!Concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return Concert;
  }

  async findByArtist(artist: string) {
    return this.ConcertModel.find({
      artist_name: { $regex: artist, $options: 'i' }, // majuscule minuscule
    }).exec();
  }
}
