import { exec } from "child_process";
//Для работы с системой и утилитами системы
/*
exec('команда системы', (ошибка, вывод консоли, вывод ошибки консоли)) */
const childProcess = exec("dir", (err, stdout, stderr) => {
  if (err) {
    console.log(err.message);
  }
  console.log("stdout:", `${stdout}`);
  console.log("stderr:", `${stderr}`);
});
//Инициализация после завершения работы childProcess
childProcess.on("exit", (code) => {
  console.log("Код выхода: ", `${code}`);
});
