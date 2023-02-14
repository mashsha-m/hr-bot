/**
 * Функция вычисляет строку с данными пользователя по id и работает с ними
 * @param {number} id id пользователя, которому будет отправлено сообщение
 * @param {string} action опциональное действие с возвращаемыми данными
 * @return строка с данными указанного по id пользователя
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testTrigger() {
    trigger("1769978686", "object")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function trigger(id, action) {

    // защита от дубля записи
    let end = false;
    // массив с id всех пользователей
    let range = sheetId.getRange(1, 1, sheetId.getLastRow(), 1).getValues();
                    //Logger.log(range)

    for (let i = 0; i < range.length; i++) {
          if (range[i][0] == id) {
              // вычислить координату строки пользователя
              if (action == "rewrite") {
                  position = i;
              }
              // составить объект из данных по соответствующему пользователю
              if (action == "object") {
                  arr = sheetId.getRange(i+1, 1, 1, sheetId.getLastColumn()).getValues();
                  //arr.forEach(logValue);
                  Logger.log(arr)
              }
              // проверка функции
              if (action == null) {
                  Logger.log("Всё получилось")
              }
              end = true;
          }
        if (end == true) {
            break;
        }
    }
}