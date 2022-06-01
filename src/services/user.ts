import { InsertResult } from "typeorm";
import dataSource from "../init/datasource";
import { User } from "../models";

export interface IUserPayload {
    name: string;
  }

export const createUser = async (payload: IUserPayload): Promise<InsertResult> => {
    const userRepository = dataSource.getRepository(User);
    const user = new User();
    return userRepository.insert({
        ...user,
        ...payload
    }); 
}

export const getUsers = async (): Promise<Array<User>> => {
    const userRepository = dataSource.getRepository(User);
    return userRepository.find(); 
}