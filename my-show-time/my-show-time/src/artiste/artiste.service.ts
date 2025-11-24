import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artiste, ArtisteDocument } from './schemas/Artiste.schema';
import { CreateArtisteDto } from './dto/create-artiste.dto';
import { UpdateArtisteDto } from './dto/update-artiste.dto';
// import { Artiste } from './entities/artiste.entity';

@Injectable()
export class ArtisteService {
  constructor(
    @InjectModel(Artiste.name) private ArtisteModel: Model<ArtisteDocument>,
  ) {}

  async create(createArtisteDto: CreateArtisteDto) {
    const newArtiste = new this.ArtisteModel(createArtisteDto);
    return newArtiste.save();
  }

  async findAll() {
    return this.ArtisteModel.find().exec();
  }

  async findOne(id: string) {
    const Artiste = await this.ArtisteModel.findById(id).exec();
    if (!Artiste) {
      throw new NotFoundException(`Artiste with ID ${id} not found`);
    }
    return Artiste;
  }

  async update(id: string, updateArtisteDto: UpdateArtisteDto) {
    const Artiste = await this.ArtisteModel.findByIdAndUpdate(
      id,
      updateArtisteDto,
      { new: true },
    ).exec();
    if (!Artiste) {
      throw new NotFoundException(`Artiste with ID ${id} not found`);
    }
    return Artiste;
  }

  async remove(id: string) {
    const Artiste = await this.ArtisteModel.findByIdAndDelete(id);
    if (!Artiste) {
      throw new NotFoundException(`Artiste with ID ${id} not found`);
    }
    return Artiste;
  }
}
