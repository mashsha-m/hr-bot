/**
 * Функция загружает изображение в таблицу через api
 * @param {string} photo путь до картинки по серверу telegram
 * @param {string} id id пользователя
 * @return запись в таблицу по вычисленным координатам
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testInsertFileToCell() {
    insertFileToCell("documents/file_7.txt", "1769978686")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function insertFileToCell(photo, id) {
  // переменная с объектом картинки
  //sendText(id, "сейчас загружу")
  const image = SpreadsheetApp
    .newCellImage()
    .setSourceUrl('https://api.telegram.org/file/bot' + token + '/' + photo)
    .build();
  reAnswer(id, "photo", image);
}