import express from "express";
import BookingController from "../controllers/booking";
import checkBookingPayload from "../middlewares/validations/booking";

const router = express.Router();
const controller = new BookingController();

router.get("/", async (_req, res) => {
  const response = await controller.getBookings();
  return res.status(200).send(response);
});

router.post("/", checkBookingPayload , async (req, res) => {
  try {
    const response = await controller.createBooking(req.body);
    return res.send(response.identifiers);
  } catch (error) {
    return res.status(409).send({ message: "Room Reservation failed" });
  }

});

export default router;