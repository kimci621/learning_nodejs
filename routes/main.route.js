import { Router } from "express";
export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.status(200);
  res.render("index", {
    title: "Главная страница",
    isHome: true,
  });
});
