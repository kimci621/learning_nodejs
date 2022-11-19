import { Router } from "express";
export const friendsRouter = Router();
import { User } from "../models/user.model.js";

const getUsers = async (filename) => {
  const usersData = await new User().getAll(filename);
  return usersData.map((i) => JSON.parse(i));
};

friendsRouter.get("/", async (req, res) => {
  const data = await getUsers("friends.json");
  res.render("friends", {
    title: "Друзья",
    isFriends: true,
    users: data,
  });
});

friendsRouter.post("/add", async (req, res) => {
  let users = await getUsers("users.json");
  const addToFriends = async (arg) => await new User().addToFriends(arg);
  const user = users.find((user) => user.id == req.body.id);
  addToFriends(user);
  res.redirect("/friends");
});
