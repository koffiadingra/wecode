import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Render,
  Body,
  Param,
  ParseIntPipe,
  Redirect,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ConcertService } from './concert/concert.service';
import { UsersService } from './users/users.service';
import { ArtisteService } from './artiste/artiste.service';
import { SessionGuard } from './auth/session.guard';
import { AdminGuard } from './auth/admin.guard';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly concertService: ConcertService,
    private readonly userService: UsersService,
    private readonly artistService: ArtisteService,
  ) {}

  @Get('/')
  @Render('index')
  async root(@Req() req: Request, @Query('artist') artist?: string) {
    let concerts;
    if (artist) {
      concerts = await this.concertService.findByArtist(artist);
    } else {
      concerts = await this.concertService.findAll();
    }

    return {
      title: 'My Show Time - Concerts',
      concerts,
      user: req.session?.user || null,
      query: { artist }, // preremplissage
    };
  }

  @Get('concert/:id/detail')
  @Render('concert/detail')
  async concertDetail(@Param('id') id: string, @Req() req: Request) {
    const concert = await this.concertService.findOne(id);
    return {
      title: '${concert.artist_name} Detail de concert',
      concert: concert,
      user: req.session?.user || null,
    };
  }

  @UseGuards(SessionGuard)
  @Get('/booking/:concertId')
  @Render('booking/create')
  async bookingPage(
    @Param('concertId') concertId: string,
    @Req() req: Request,
  ) {
    const concert = await this.concertService.findOne(concertId);
    return {
      title: 'Booking - My Show Time',
      concert,
      user: req.session?.user || null,
    };
  }

  @Get('profile/')
  @UseGuards(SessionGuard)
  @Render('profile/edit')
  async profile(@Req() req: Request) {
    const userId = req.session.user!._id.toString();
    const user = await this.userService.findById(userId);
    return {
      title: 'My Show Time - My Profile',
      user: user,
    };
  }

  @Get('/register')
  @Render('auth/register')
  signup() {
    return {};
  }
  @UseGuards(SessionGuard, AdminGuard)
  @Get('/adduser')
  @Render('add_users')
  add_users() {
    return {};
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Get('/addconcert')
  @Render('add_concert')
  add_concert() {
    return {};
  }

  @Get('/login')
  @Render('auth/login')
  signin() {
    return {};
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Get('/admin')
  @Render('admin')
  async admin() {
    const concerts = await this.concertService.findAll();
    const users = await this.userService.findAll();
    const artists = await this.artistService.findAll();
    return {
      title: 'My Show Time - Admin',
      concerts,
      users,
      artists,
    };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Get('/admin/users')
  @Render('admin_users')
  async user() {
    const users = await this.userService.findAll();
    return {
      users,
    };
  }
  @UseGuards(SessionGuard, AdminGuard)
  @Get('/admin/concert/')
  @Render('admin_concert')
  async concert() {
    const concerts = await this.concertService.findAll();
    return {
      concerts,
    };
  }
  @UseGuards(SessionGuard, AdminGuard)
  @Get('/admin/artist/')
  @Render('admin_artist')
  async artist() {
    const artists = await this.artistService.findAll();
    return {
      artists,
    };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Post('/admin/concerts')
  async createConcert(@Body() dto: any) {
    await this.concertService.create(dto);
    return { success: true };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Patch('/admin/concerts/:id')
  async updateConcert(@Param('id', ParseIntPipe) id: string, @Body() dto: any) {
    await this.concertService.update(id, dto);
    return { success: true };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Delete('/admin/concerts/:id')
  async deleteConcert(@Param('id', ParseIntPipe) id: string) {
    await this.concertService.remove(id);
    return { success: true };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Patch('/admin/users/:id')
  async updateUser(@Param('id', ParseIntPipe) id: string, @Body() dto: any) {
    await this.userService.update(id, dto);
    return { success: true };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Post('/admin/users/:id')
  @Redirect('/admin')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.userService.delete(id);
  }
  @UseGuards(SessionGuard, AdminGuard)
  @Post('/admin/artists')
  async createArtist(@Body() dto: any) {
    await this.artistService.create(dto);
    return { success: true };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Patch('/admin/artists/:id')
  async updateArtist(@Param('id', ParseIntPipe) id: string, @Body() dto: any) {
    await this.artistService.update(id, dto);
    return { success: true };
  }

  @UseGuards(SessionGuard, AdminGuard)
  @Post('/admin/artists/:id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    await this.artistService.remove(id);
    return { success: true };
  }
}
