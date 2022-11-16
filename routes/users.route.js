import { Router } from "express";
export const usersRouter = Router();
import { User } from "../models/user.model.js";
import fs from "fs";
import path from "path";

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

usersRouter.get("/:name/edit", async (req, res) => {
  if (req.query.allow) {
    //req.query хранит параметры url
    const data = await getUsers();
    const user = data.find((user) => user.name == req.params.name);
    res.render("edit", {
      layout: "userEdit",
      user: user,
    });
  } else {
    res.redirect("/users");
  }
});

usersRouter.post("/edit", async (req, res) => {
  let users = await getUsers();
  const user = users.find((user) => user.id == req.body.id);
  const index = users.indexOf(user);
  const dir = path.dirname(import.meta.url.split("///")[1]);
  if (index !== -1) {
    users[index].name = req.body.name;
    users[index].password = req.body.password;
    users = users.map((i) => JSON.stringify(i));
    fs.writeFile(
      path.join(dir, "..", "database", "users.json"),
      JSON.stringify(users),
      (err) => {
        if (err) throw err;
      }
    );
  }
  res.redirect("/users");
});
