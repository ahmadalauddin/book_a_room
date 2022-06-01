import { InsertResult } from "typeorm";
import dataSource from "../init/datasource";
import { Room } from "../models";

export interface IRoomPayload {
    name: string;
}

const roomRepository = dataSource.getRepository(Room);

export const getAvailableRooms = async (date: String): Promise<Array<Room>> => {
    const rooms = await roomRepository.createQueryBuilder("room").leftJoin("room.bookings", "booking", "booking.date = :myDate", {myDate: date}).where("booking.date IS NULL").getMany();
    return rooms;
}

export const createRoom = async (payload: IRoomPayload): Promise<InsertResult> => {
    const room = new Room();
    return await roomRepository.insert({
        ...room,
        ...payload
    });
}

export const getRooms = async (): Promise<Array<Room>> => {
    return roomRepository.find();
}