import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import * as QRCode from 'qrcode';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async create(data: Partial<Booking>): Promise<Booking> {
    return await this.bookingModel.create(data);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().populate('owner concert').exec();
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookingModel.findById(id).populate('owner concert').exec();
  }

  async generateQr(bookingId: string): Promise<string> {
    const booking = await this.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');

    const url = process.env.APP_URL || 'http://localhost:3000';
    const qrData = `${url}/booking/confirmation/${bookingId}`;
    return await QRCode.toDataURL(qrData);
  }
}
