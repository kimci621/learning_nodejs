import express from "express";
import exphbs from "express-handlebars";
import { mainRouter } from "../routes/main.route.js";
import { aboutRouter } from "../routes/about.route.js";
import { loginRouter } from "../routes/login.route.js";
import { usersRouter } from "../routes/users.route.js";


export const initExpress = () => {
  const app = express();
  const port = 3000;
  //настройки handlebars
  const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
  });
  //добавляем шаблонизатор в express
  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
  //views находится в views
  app.set("views", "views");
  //статичный начальный url для express,он также передает его в шаблонизатор
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));

  //routes
  app.use("/", mainRouter);
  app.use("/about", aboutRouter);
  app.use("/login", loginRouter);
  app.use("/users", usersRouter);

  //init
  app.listen(port, async () => {
    console.log(`Сервер был запущен на localhost:${port}`);
  });
};
