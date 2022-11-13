import { Router } from "express";
export const usersRouter = Router();
import { User } from "../models/user.model.js";

usersRouter.get("/", async (req, res) => {
  const usersData = await new User().getAll();
  const parsed = usersData.map((i) => JSON.parse(i));
  res.render("users", {
    title: "Пользователи",
    isUsers: true,
    users: parsed,
  });
});
