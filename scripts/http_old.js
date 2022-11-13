import http from "http";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const views = path.join(__dirname, "..", "views");

export const initServer = () => {
  //модуль http для создания и настройки сервера
  const port = 3000;

  const server = http.createServer((req, res) => {
    //коллбэк "хендлер" запускается если есть запросы на сервер
    //req - запрос на сервер
    //res - ответ из сервера

    switch (req.url) {
      case "/":
        fs.readFile(path.join(views, "index.html"), "utf-8", (err, content) => {
          if (err) throw err;
          res.end(content);
        });
        break;
      case "/login":
        if (req.method === "POST") {
          res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
          });

          const body = [];
          let userName;
          req.on("data", (data) => {
            body.push(Buffer.from(data));
          });
          req.on("end", () => {
            userName = body.toString().split("&")[0].split("=")[1];
            res.end(`<h2>пользователь с именем ${userName} не найден!</h2>`);
          });
        } else if (req.method === "GET") {
          fs.readFile(
            path.join(views, "login.html"),
            "utf-8",
            (err, content) => {
              if (err) throw err;
              res.end(content);
            }
          );
        }

        break;
      case "/about":
        fs.readFile(path.join(views, "about.html"), "utf-8", (err, content) => {
          if (err) throw err;
          res.end(content);
        });
        break;
      case "/users/all":
        res.writeHead(200, {
          "Content-Type": "application/json; charset=UTF-8",
        });
        res.end(JSON.stringify(users))
        break;
    }
  });

  server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
};


var users = [
  {id: 1, name: 'SomeBody'},
  {id: 2, name: 'SomeBodyElse'}
]
//запуск через nodemon позволяет следить за изменениями
//в js, jsm, json файлах и он сам будет перезапускать сервер
//если были изменения
