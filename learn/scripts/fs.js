import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//создать папку асинхронно, mkdirSync - аснхронно(блокирует EvebtLoop)
fs.mkdir(path.join(__dirname, "test"), (err) => {
  if (err) throw new Error();

  console.log("Folder is created");
});

////создать файл асинхронно
fs.writeFile(
  path.join(__dirname, "test", "testFile.txt"), //путь то текущего файла, папка в этой директории, название файла
  "text inside file testFile", // контент этого файла
  (err) => {
    // коллбэк создания
    if (err) throw new Error();
    console.log("testFile.txt был создан и добавлен в папку test");
  }
);
//добавить контент в уже созданный файл
fs.appendFile(
  path.join(__dirname, "test", "testFile.txt"),
  "\nперевед: текст в файле testFile",
  (err) => {
    if (err) throw new Error();
    console.log("testFile.txt был изменен");
  }
);
//считать файл
fs.readFile(path.join(__dirname, "test", "testFile.txt"), (err, data) => {
  if (err) throw new Error();
  console.log(data.toString("utf8"));
});
//переименовать файл
fs.rename(
  path.join(__dirname, "test", "testFile.txt"),
  path.join(__dirname, "test", "newNameOfTestFile.txt"),
  (err) => {
    if (err) throw new Error();
    console.log("testFile.txt был переименован в newNameOfTestFile.txt");
  }
);
//еще много других методов у fs, смотреть доку :)
