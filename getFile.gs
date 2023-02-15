/**
 * Функция подготавливает картинку к загрузке в таблицу и файл к загрузке на гугл
 * @param {string} file_id id изображения
 * @param {number} telegram_ID id пользователя
 * @return {string} file_path путь картинки с сервера telegram
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testGetFile() {
    getFile("BQACAgIAAxkBAAIESWPk4BNsED58ZKlRvdEBCxS91wU7AAKHIgACFO0oS5VByVl_X0wgLgQ", "1769978686")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function getFile(file_id, telegram_ID) {

  trigger(telegram_ID, "rewrite")

  // вычисляем текущий статус вопроса
  let current_status = sheetId.getRange(position+1, 3).getValue();

  // метод getFile берет данные изображения с сервера telegram
  let file_fetch = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getFile?file_id='+ file_id);

  // преобразование пришедших данных в объект
  let file_obj = JSON.parse(file_fetch);

  // выбираем путь картинки из объекта
  let file_path = file_obj.result.file_path;
  
  if (file_path.includes("documents") == true) {

    //sendText(telegram_ID, "полшло дело")
    let doc = 'https://api.telegram.org/file/bot' + String(token) + '/' + String(file_path);
    //sendText(telegram_ID, "собралась doc")
    createFile(doc, telegram_ID, file_path, current_status)

  } else if (file_path.includes("file") == true) {
    
    insertImageToCell(file_path, telegram_ID, current_status);

  }
}


















