function doPost(e) {
  try {
    // возвращаемые данные при ответе от пользователя
    let contents = JSON.parse(e.postData.contents);
    // текст от пользователя
    let text = contents.message.text;
    // username пользователя
    let chat_id = contents.message.chat.username;
    // id пользователя
    let id = contents.message.chat.id;
    
    sheetId.getRange(10, 1).setValue(JSON.stringify(contents, null, 5));
    /*sendText(id, "дай подумаю")
    trigger(id)
    sendText(id, "ага")
    sendText(id, arr[0][1])*/

    //sendText(id, text + " - сказал он")
    if ((/^\//.exec(text))) {
      if (text === '/start') {
        sendText(id, 'Приготовьтесь отвечать на вопросы, вы готовы? /begin')
      }
      if (text === '/begin') {
        //sheetId.appendRow([id, "@"+chat_id, Date(), Date()])
        trigger(id)
        sendText(id, answers)
      }
      /*if (text === '/begin') {
        sheetId.appendRow([id, "@"+chat_id, Date])
        sendText(id, "Вопрос 1: сколько у тебя ног?", FIRST_Q)
      }  проверка на наличие команды из списка, должно ссылаться на функцию, которая сравнивает
      else {
        let answer = text;
        if (answer) {
          sendText(chat_id, `${answer[0][0]}: ${answer[0][1]}`);
        } else {
          sendText(chat_id, "Такой команды я не знаю");
        }
      }*/
    } else {
      sendText(id, text + " - сказал он")
    }
  } catch (e) {
    Logger = BetterLog.useSpreadsheet(sheetId);
    e = (typeof e === 'string') ? new Error(e) : e;
    Logger.log('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.', err.name || '',
            err.message || '', err.lineNumber || '', err.fileName || '', err.stack || '', '');
  };
}