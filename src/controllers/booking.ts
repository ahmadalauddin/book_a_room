import { Get, Route, Tags, Post, Body } from "tsoa";
import { InsertResult } from "typeorm";
import { Booking } from "../models";
import {
    createBooking,
    IBookingPayload,
    getBookings,
} from "../services/booking";

@Route("bookings")
@Tags("Booking")
export default class BookingController {
    @Get("/")
    public async getBookings(): Promise<Array<Booking>> {
        return getBookings();
    }

    @Post("/")
    public async createBooking(@Body() body: IBookingPayload): Promise<InsertResult> {
        return createBooking(body);
    }
}