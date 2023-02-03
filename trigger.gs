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
    trigger("1769978686")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function trigger(id, action) {

    // защита от дубля записи
    let end = false;
    // массив с id всех пользователей
    let range = sheetId.getRange(1, 1, sheetId.getLastRow(), 1).getValues();

    for (let i = 0; i < range.length; i++) {
        for (let j = 0; j < range[i].length; j++) {
            if (range[i][j] == id) {
                // вычислить координату строки пользователя
                if (action == "rewrite") {
                    position = i;
                }
                // составить объект из данных по соответствующему пользователю
                if (action == "object") {
                    arr = sheetId.getRange(i+1, j+1, 1, sheetId.getLastColumn()).getValues();
                    arr.forEach(logValue);
                }
                if (action == null) {
                    Logger.log("Всё получилось")
                }
                end = true;
            }
        }
        if (end == true) {
            break;
        }
    }
}