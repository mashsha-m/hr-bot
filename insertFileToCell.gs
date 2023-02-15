/**
 * Функция загружает изображение в таблицу через api
 * @param {string} photo путь до картинки по серверу telegram
 * @param {string} id id пользователя
 * @param {string} current_status текущий статус
 * @return запись в таблицу по вычисленным координатам
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testInsertImageToCell() {
    insertFileToCell("documents/file_7.txt", "1769978686")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function insertImageToCell(photo, id, current_status) {
  // переменная с объектом картинки
  //sendText(id, "сейчас загружу")
  const image = SpreadsheetApp
    .newCellImage()
    .setSourceUrl('https://api.telegram.org/file/bot' + token + '/' + photo)
    .build();
    
  if (current_status == "last") {
  reAnswer(id, "photo", image);
  } else {
  reAnswer(id, current_status, image);
  }

  //sendText(id, current_status)

  let blob = UrlFetchApp.fetch('https://api.telegram.org/file/bot' + token + '/' + photo);
  
  let drive = DriveApp.getFolderById("1ngsjSu3vwPVLMg88f3tamgcD32xYAuRK");
  drive.createFile(blob)

  trigger(id, "rewrite")
  let current_title = sheetId.getRange(position+1, 3).getValue();
  findColTitle(id)
  if (column_title == "q11_end") {

    reAnswer(id, column_title, dateFormat, "is_date")
    
    if (current_title == "last") {

      let check = true;

      trigger(id, "object")

      // код перебирает массив ответов пользователя и проверяет, что все вопросы отвечены
      arr[0].forEach(function (element) {
        if (element == "") {

          check = false;
          return sendText(id, "Тестирование ещё не закончено.")

        }
      });

      if (check == true) {
        return theEnd(id)
      }
    }

  }
}