import { benchmark } from "./benchmark.js";

process.on("message", (msg) => {
  console.log(`получено: ${msg}`);
  process.send(benchmark(msg));
  process.disconnect();
});
