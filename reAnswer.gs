/**
 * Функция делает запись в ячейку соответствующей колонки для пользователя по telegram_ID
 * @param {string} telegram_ID id пользователя, по которому код ищет строку, в которой будет происходить запись
 * @param {string} column_title название колонки, по которому код ищет колонку, в которой будет происходить запись
 * @param {string} newValue значение, которое будет записываться в ячейку
 * @return запись в таблицу по вычисленным координатам
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testReAnswer() {
    reAnswer("1725596821", 'q1', "Ещё значение")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function reAnswer(telegram_ID, column_title, newValue, check) {

    titles.forEach(function(title) {
        for (i = 0; i < title.length; i++) {
            if (title[i] == column_title) {
              trigger(telegram_ID, "rewrite")
              let oldVal = sheetId.getRange(position+1, i+1).getValue()
              if ((oldVal == "") || (check == "is_status")) {
                sheetId.getRange(position+1, i+1).setValue(newValue)
              } else {
                sheetId.getRange(position+1, i+1).setValue(oldVal + "; " + newValue)
              }
            }
        }
    });

}