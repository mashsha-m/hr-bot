/**
 * Функция отправляет вопрос пользователю
 * @param {number} id id пользователя, которому будет отправлено сообщение
 * @param {string} text текст для сообщения
 * @param {string} keyBoard опциональное меню-клавиатура
 * @return JSON запрос в телеграм
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testSendQ() {
    sendQ("1769978686", "q2", FORCE_REPLY)
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function sendQ(id, column_title, keyBoard) {

    let question = "";

    for (i = 0; i < qTitles.length; i++) {
        if (qTitles[i] == column_title) {
          question = questions[i][0];
        }
    }

    // отправляемые данные
    let data = {
        method: "post",
        payload: {
            method: "sendMessage",
            chat_id: String(id),
            text: question,
            parse_mode: "HTML",
            reply_markup: JSON.stringify(keyBoard)
        }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);

}