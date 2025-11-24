import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  UseInterceptors,
  UploadedFile,
  Render,
  Res,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post('/create')
  @Redirect('/admin')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/concerts',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() createConcertDto: CreateConcertDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createConcertDto.image = `/uploads/concerts/${file.filename}`;
    }
    return this.concertService.create(createConcertDto);
  }

  @Get()
  findAll() {
    return this.concertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertService.findOne(id);
  }

  @Post(':id/update')
  @Redirect('/admin')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/concerts',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateConcertDto: UpdateConcertDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (file) {
      updateConcertDto.image = `/uploads/concerts/${file.filename}`;
    }
    await this.concertService.update(id, updateConcertDto);
    return res.render('admin');
  }

  @Get(':id/edit')
  @Render('update_concert')
  async editForm(@Param('id') id: string) {
    const concert = await this.concertService.findOne(id);
    return { concert };
  }

  @Post(':id')
  @Redirect('/admin')
  deleteConcert(@Param('id') id: string) {
    return this.concertService.remove(id);
  }
}
