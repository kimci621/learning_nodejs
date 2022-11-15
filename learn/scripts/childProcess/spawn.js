import { spawn } from "child_process";
//Для работы с системой и утилитами системы, то же самое что и exec, другая реализация
const childProcess = spawn("whoami");
//вывод
childProcess.stdout.on("data", (data) => {
  console.log(`Вывод: ${data}`);
});
//вывод ошибки
childProcess.stderr.on("data", (data) => {
  console.log(`Ошибка: ${data}`);
});
//действие по завершению
childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});

import { spawn } from "child_process";

// var cmd = "";

// if (process.platform === "win32") {
//   cmd += "cmd /c chcp 65001>nul && ";
// }

// cmd = spawn("help");

// cmd.stdout.on("data", (data) => {
//   console.log(`stdout: ${data}`);
// });

// cmd.stderr.on("data", (data) => {
//   console.log(`stderr: ${data}`);
// });

// cmd.on("error", (error) => {
//   console.log(`error: ${error.message}`);
// });

// cmd.on("close", (code) => {
//   console.log(`child process exited with code ${code}`);
// });
