import { DataSource } from "typeorm";
import dbConfig from "../configurations/database";
import eventEmitter from "../utils/event"
import { EVENT } from "../utils/constants"

const dataSource = new DataSource(dbConfig);

dataSource.initialize()
    .then(() => {
        eventEmitter.emit(EVENT.DB_CONNECTION)
    })
    .catch((err: any) => {
        console.error("Unable to connect to db", err);
        process.exit(1);
    });


export default dataSource