import express from "express";
import RoomController from "../controllers/room";

const router = express.Router();
const controller = new RoomController();

router.get("/", async (_req, res) => {
  const response = await controller.getRooms();
  return res.status(200).send(response);
});

router.post("/", async (req, res) => {
  try {
    const response = await controller.createRoom(req.body);
    return res.send(response.identifiers);
  } catch (error) {
    return res.status(409).send({ message: "Error creating a meeting" });
  }
});

router.get("/available/:date",  async (req, res) => {
  const response = await controller.getAvailableRooms(req.params.date);
  if (!response) res.status(404).send({ message: "No available meeting rooms found" });
  return res.status(200).send(response);
});

export default router;