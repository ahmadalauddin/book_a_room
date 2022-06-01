import { InsertResult } from "typeorm";
import dataSource from "../init/datasource";
import { Booking } from "../models";
export interface IBookingPayload{
    roomId: number;
    userId: number;
    date: String;    
}

const bookingRepository = dataSource.getRepository(Booking);

export const createBooking = async (payload: IBookingPayload): Promise<InsertResult> => {
    const booking = new Booking();
     return bookingRepository.insert({
        ...booking,
        ...payload
    });
}

export const getBookings = async (): Promise<Array<Booking>> => {
    return bookingRepository.find();
}