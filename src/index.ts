import 'dotenv/config';
import express, { Application } from "express";
const app: Application = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

/** Endpoint to check status of the service. */
app.get("/ping", async(req, res)=> res.status(200).json({message: `Service is running at port ${process.env.PORT}`}));

app.listen(PORT, () => console.info(`Listening at port ${PORT}`));

export default app;