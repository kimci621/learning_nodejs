import os from "os";
//Платформа
console.log(os.platform());
//Операционная система
console.log(os.type());
//Архитектура
console.log(os.arch());
//Информация о ядрах cpu
console.log(os.cpus());
//Вернет имя хоста
console.log(os.hostname());
//Возвращает сведения о сетевых интерфейсах, доступных в вашей системе.
console.log(os.networkInterfaces());
//Свободное место в диске
console.log(os.freemem()); //байт
//Всего места в диске
console.log(os.totalmem()); //байт
//Корневая директория системы
console.log(os.homedir());
//Сколько времени работает система
console.log(os.uptime()); //секунд
