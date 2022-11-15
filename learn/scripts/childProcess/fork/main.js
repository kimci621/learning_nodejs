import childProcess from "child_process";

const newFork = childProcess.fork("./fork.js");

newFork.on("message", (msg) => {
  console.log(`Ответ: ${msg}`);
  newFork.kill();
});

newFork.send("Ping!");
