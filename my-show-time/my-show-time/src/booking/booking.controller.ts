import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import type { Request, Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':concertId')
  async createBooking(
    @Param('concertId') concertId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      if (!req.session?.user) {
        return res.redirect('/login');
      }

      const booking = await this.bookingService.create({
        concert: concertId,
        owner: req.session.user._id.toString(),
      });

      return res.redirect(`/booking/confirmation/${booking._id}`);
    } catch (error) {
      console.error('Booking error:', error);
      return res.status(400).send({ error: error.message });
    }
  }

  @Get('confirmation/:bookingId')
  async bookingConfirmation(
    @Param('bookingId') bookingId: string,
    @Res() res: Response,
  ) {
    const booking = await this.bookingService.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');

    const qrCode = await this.bookingService.generateQr(bookingId);

    return res.render('booking/confirmation', { booking, qrCode });
  }
}
