import { Router } from "express";
export const usersRouter = Router();
import { User } from "../models/user.model.js";

const getUsers = async () => {
  const usersData = await new User().getAll();
  return usersData.map((i) => JSON.parse(i));
};

usersRouter.get("/", async (req, res) => {
  const data = await getUsers();
  res.render("users", {
    title: "Пользователи",
    isUsers: true,
    users: data,
  });
});

usersRouter.get("/:name", async (req, res) => {
  const data = await getUsers();
  const user = data.find((user) => user.name == req.params.name);
  res.render("user", {
    layout: "userShow",
    user: user,
  });
});
