/**
 * Функция вычисляет название заполняемой колонки
 * @param {string} telegram_ID id пользователя, по которому код ищет строку, в которой будет происходить запись
 * @return {string} column_title возвращает заголовок крайней незаполненной ячейки строки
 * @return {number} emptyGet возвращает номер крайней незаполненной ячейки строки
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testFindColTitle() {
    findColTitle("1769978686")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function findColTitle(telegram_ID) {

    // номер заполняемого столбца
  
    trigger(telegram_ID, "rewrite");

    // массив строчки пользователя
    let array = sheetId.getRange(position+1, 1, position+1, sheetId.getLastColumn()).getValues();
    
      for (let i = 0; i < array[0].length; i++){ 
        if (array[0][i] == "") {
          sheetId.getRange(position+1, i+1).setValue("=COLUMN()");
          emptyGet = sheetId.getRange(position+1, i+1).getValue(); 
          sheetId.getRange(position+1, i+1).setValue("");
               // Logger.log(emptyGet)
          break;
        } 
      }
      //return Logger.log(emptyGet);
    titles.forEach(function(title) {
        for (i = 0; i < title.length; i++) {
            if (i+1 == emptyGet) {
              // заполняемый столбец
                return column_title = title[i];
          //sendText(telegram_ID, column_title)
                //sendText(telegram_ID, column_title+" - закончился вопрос")
                let emptyGet = i;
            }
        }
    });
}