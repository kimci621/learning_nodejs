import { Router } from "express";
export const loginRouter = Router();
import { User } from "../models/user.model.js";

loginRouter.get("/", (req, res) => {
  res.status(200);
  res.render("login", {
    title: "Логин",
    isLogin: true,
  });
});

loginRouter.post("/", async (req, res) => {
  res.status(200);
  const user = new User(req.body.name, req.body.password);
  await user.save();
  res.redirect("/");
});
