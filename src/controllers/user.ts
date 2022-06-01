import { InsertResult } from "typeorm";
import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models";
import {
    createUser,
    IUserPayload,
    getUsers,
} from "../services/User";

@Route("users")
@Tags("User")
export default class RoomController {
    @Get("/")
    public async getUsers(): Promise<Array<User>> {
        return getUsers();
    }

    @Post("/")
    public async createUser(@Body() body: IUserPayload): Promise<InsertResult> {
        return createUser(body);
    }
}