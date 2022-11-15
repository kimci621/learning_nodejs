export function benchmark(num) {
  console.log("benchmark start, argument is: ", num);
  let arr = [];
  for (let i = 0; i < num * 1000; i++) {
    arr.push(i * 124122112412421315);
  }
  return arr.map((i) => i * 123);
}
