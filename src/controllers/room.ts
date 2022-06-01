import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Room } from "../models";
import {
    createRoom,
    IRoomPayload,
    getRooms,
    getAvailableRooms,
} from "../services/room";

@Route("rooms")
@Tags("Room")
export default class RoomController {
    @Get("/")
    public async getRooms(): Promise<Array<Room>> {
        return getRooms();
    }

    @Post("/")
    public async createRoom(@Body() body: IRoomPayload){
        return createRoom(body);
    }

      @Get("/available/:date")
      public async getAvailableRooms(@Path() date: String): Promise<Array<Room> | null> {
        return getAvailableRooms(String(date));
      }
}