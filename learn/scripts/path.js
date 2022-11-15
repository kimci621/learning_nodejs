import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url); //Путь от корня включая текущий файл
const __dirname = dirname(__filename); //Путь от корня до текущего файла

console.log(path.basename("../someHtml1.html")); //имя файла
console.log(path.extname("../someHtml1.html")); //расширение файла
console.log(path.parse("../someHtml1.html")); //спарсить указанный файл в объект
console.log(path.join("../someHtml1.html", "second", "third")); // объеденить путь в ..\someHtml1.html\second\third
