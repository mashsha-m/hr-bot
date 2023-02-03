/**
 * Функция отправляет сообщение пользователю, используя JSON формат
 * @param {number} id id пользователя, которому будет отправлено сообщение
 * @param {string} text текст для сообщения
 * @param {string} keyBoard опциональное меню-клавиатура
 * @return JSON запрос в телеграм
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testSend() {
    sendText("1769978686", "Hello, World!", FIRST_Q)
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function sendText(id, text, keyBoard) {

    // отправляемые данные
    let data = {
        method: "post",
        payload: {
            method: "sendMessage",
            chat_id: String(id),
            text: text,
            parse_mode: "HTML",
            reply_markup: JSON.stringify(keyBoard)
        }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);

}