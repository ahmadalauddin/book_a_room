import 'dotenv/config';
import "./init/datasource";
import app from "./app";

import eventEmitter from "./utils/event"
import { EVENT } from "./utils/constants"


const PORT = process.env.PORT || 5000;

eventEmitter.on(EVENT.DB_CONNECTION, async () => {
  app.listen(PORT, () => console.info(`Listening at port ${PORT}`));
});

process
  .on('uncaughtExceptionMonitor', err => {
    console.log(err, 'Uncaught Exception thrown');
  });