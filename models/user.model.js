import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path, { resolve } from "path";

export class User {
  name;
  password;
  id;
  current = path.dirname(import.meta.url.split("///")[1]);
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.id = uuidv4();
  }

  toJSON() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      password: this.password,
    });
  }

  async save() {
    const users = await this.getAll();
    users.push(this.toJSON());
    fs.writeFile(
      path.join(this.current, "..", "database", "users.json"),
      JSON.stringify(users),
      (err) => {
        if (err) throw err;
      }
    );
  }

  getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(this.current, "..", "database", "users.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(content));
          }
        }
      );
    });
  }
}
