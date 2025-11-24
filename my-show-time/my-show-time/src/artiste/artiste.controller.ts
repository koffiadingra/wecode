import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { ArtisteService } from './artiste.service';
import { CreateArtisteDto } from './dto/create-artiste.dto';
import { UpdateArtisteDto } from './dto/update-artiste.dto';

@Controller('artiste')
export class ArtisteController {
  constructor(private readonly artisteService: ArtisteService) {}

  @Post()
  create(@Body() createArtisteDto: CreateArtisteDto) {
    return this.artisteService.create(createArtisteDto);
  }

  @Get()
  findAll() {
    return this.artisteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artisteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtisteDto: UpdateArtisteDto) {
    return this.artisteService.update(id, updateArtisteDto);
  }

  @Post(':id')
  @Redirect('/admin')
  async deleteArtiste(@Param('id') id: string) {
    return await this.artisteService.remove(id);
  }
}
