import express from "express";  
import UserController from "../controllers/user";

const router = express.Router();
const controller = new UserController();

router.get("/", async (_req, res) => {
  const response = await controller.getUsers();
  return res.status(200).send(response);
});

router.post("/",  async (req, res) => {
    try {
      const response = await controller.createUser(req.body);
      return res.send(response.identifiers);
    } catch (error) {
      return res.status(409).send({ message: "Error creating a user" });
    }
});

export default router;