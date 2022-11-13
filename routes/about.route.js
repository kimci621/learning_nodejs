import { Router } from "express";
export const aboutRouter = Router();

aboutRouter.get("/", (req, res) => {
  res.status(200);
  res.render("about", {
    title: "О нас",
    isAbout: true,
  });
});
