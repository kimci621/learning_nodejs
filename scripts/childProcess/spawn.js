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
