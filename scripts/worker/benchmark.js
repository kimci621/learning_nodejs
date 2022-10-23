export function bench(num) {
  let arr = [];
  for (let i = 0; i < num * 10022; i++) {
    arr.push(i * 124122112412421315);
  }
  return arr.map((i) => i * 123);
}
