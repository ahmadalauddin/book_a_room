import express from "express";
import RoomRouter from "./room";
import UserRouter from "./user";
import BookingRouter from "./booking";

const router = express.Router();

router.get("/ping", async(req, res)=> res.status(200).json({message: `Service is running at port ${process.env.PORT}`}));

router.use("/rooms", RoomRouter);
router.use("/users", UserRouter);
router.use("/bookings", BookingRouter);

export default router;