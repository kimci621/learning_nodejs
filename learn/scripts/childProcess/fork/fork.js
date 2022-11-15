process.on("message", (msg) => {
  console.log(`Ответ:  ${msg}`);
  process.send("Pong!");
  process.disconnect();
});
