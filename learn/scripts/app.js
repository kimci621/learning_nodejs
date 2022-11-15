// const {foo, bar} = require('./testCommon');
import { esBar, esFoo } from "./testEsModules.js";
//читаем файл из указанной директории
const data = fs.readFileSync("../process_commands.txt");
console.log(data.toString());
