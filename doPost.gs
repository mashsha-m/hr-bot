/*function test() {
  const contents = {
     "update_id": 609652498,
     "message": {
          "message_id": 1097,
          "from": {
               "id": 1769978686,
               "is_bot": false,
               "first_name": "Masha",
               "last_name": "Kuzmicheva",
               "username": "Mashka_Programmer",
               "language_code": "ru"
          },
          "chat": {
               "id": 1769978686,
               "first_name": "Masha",
               "last_name": "Kuzmicheva",
               "username": "Mashka_Programmer",
               "type": "private"
          },
          "date": 1675943955,
          "document": {
               "file_name": "подсказка.txt",
               "mime_type": "text/plain",
               "file_id": "BQACAgIAAxkBAAIESWPk4BNsED58ZKlRvdEBCxS91wU7AAKHIgACFO0oS5VByVl_X0wgLgQ",
               "file_unique_id": "AgADhyIAAhTtKEs",
               "file_size": 1776
          }
     }
}

doPost(contents)
}*/

function doPost(e) {
  //sendText("1769978686", "начало начал")
  try {
    // возвращаемые данные при ответе от пользователя
    let contents = JSON.parse(e.postData.contents)

    // текст от пользователя
    let text = contents.message.text;

    // id пользователя
    let id = contents.message.chat.id;

    // username пользователя
    let username = contents.message.chat.username;
    //sendText(id, "сейчас начну")
    //sheetIdTest.getRange(10, 1).setValue(JSON.stringify(contents, null, 5));
    if (contents.message.photo) {
      sendText(id, "картинку поймал")
      // переменная берет id картинки с самым большим качеством из пришедших данных 
      let file_id = contents.message.photo.at(-1).file_id;
      getFile(file_id, id)
    }
    if (contents.message.document) {
      //sendText("1769978686", "добрались до документа")
      // переменная берет id документа
      let doc_id = contents.message.document.file_id;
      getFile(doc_id, id);
    }
    if ((/^\//.exec(text))) {
        if (text === '/start') {
          sendText(id, sheetIdQuestions.getRange(1,2).getValue())
        }
        if (text === '/begin') {
          trigger(id, "rewrite")
          if (position == 0) {
            sheetId.appendRow([id, "@"+username, status[0]]);
            //reAnswer(id, "q4", "-")
            //findColTitle(id)
            sendQ(id, "q1", FORCE_REPLY)
          } else {
            sendText(id, "Вы уже проходили тестирование!");
            return false;
          }
        }
        if (text === '/next') {
        // проверка на заполненное поле предыдущего вопроса, если оно не заполнено, то просим ответить на вопрос и прерываем код
        trigger(id, "rewrite")
        findColTitle(id)
        //return sendText(id, emptyGet)
        let isset_photo = sheetId.getRange(position+1, 26).getValue();
        let current_status = sheetId.getRange(position+1, 3).getValue();
        //sendText(id, current_status)
        // ---------------------------------------------------------- Эта фича не работает, на 11 шаге он принимает команду /next и заканчивает вопрос
        if (column_title == "q11_end" && isset_photo == "") {
          return sendText(id, 'Это последний вопрос, на него будет приниматься только скриншот')
        } else if (column_title == current_status) {
          return sendText(id, 'Вы не ответили на предыдущий вопрос. Пожалуйста, ответьте или напишите в ответ "Готово", а после отправьте /next');
        } else if (column_title == "") {
          //theEnd(id)
          return timer(id)
        }
        reAnswer(id, column_title, dateFormat)
        findColTitle(id)
        //sendText(id, column_title+" - следующий вопрос")
        // вернет column_title (допустим q2)
        for (let i = 0; i < qTitles.length; i++) {
          if (qTitles[i] == column_title) {
        //sendText(id, i)
          reAnswer(id, "status", column_title, "is_status")
          return sendQ(id, column_title, FORCE_REPLY)
          }
        }
      }
    } else {
      if (text == "Прочитано" || text == "прочитано") {
        return sendQ(id, "check", FORCE_REPLY)
      } else if (text == "Поехали" || text == "поехали") {
          trigger(id, "rewrite")
          let current_title = sheetId.getRange(position+1, 3).getValue();
          if (current_title == "last") {
            return sendText(id, "Задание уже выполняется")
          }
          sendQ(id, "get_link")
          sendQ(id, "timer", FORCE_REPLY)
          reAnswer(id, titles[0].at(-3), ("["+dateFormat+"] "+text), "is_status")
          return reAnswer(id, "status", "last", "is_status")
          //timer("start")
      } else if (words.includes(text)) {
        return sendText(id, "Спасибо! (´｡• ω •｡`)")
      } else {
        trigger(id, "rewrite")
        if (position == 0) {
          return sendText(id, "дратуй")
        }
        let current_title = sheetId.getRange(position+1, 3).getValue();
        if (current_title == "last") {
          let current_photo = sheetId.getRange(position+1, 26).getValue();
          if (current_photo == "") {
            return sendText(id, "Это не скриншот. Пришли, пожалуйста скриншот.")
          }
        } else if (current_title == "q2") {
          if (PHONE_REGEXP.test(text) == false) {
            return sendText(id, "Номер телефона не валиден")
          } else {
            return reAnswer(id, current_title, "["+dateFormat+"] "+text);
          }
        } else if (current_title == "q3") {
          if (EMAIL_REGEXP.test(text) == false) {
            return sendText(id, "Email не валиден")
          } else {
            return reAnswer(id, current_title, "["+dateFormat+"] "+text);
          }
        } else if (current_title == "q4") {
          if (text) {
            return sendText(id, "Это не файл.")
          }
        } else if (current_title == "q11") {
          return sendText(id, 'Это последний вопрос, на него будет приниматься только скриншот')
        } else {
          if (text !== "") {
            return reAnswer(id, current_title, "["+dateFormat+"] "+text);
          }
        }
      }
    }
  } catch (err) {
    Logger = BetterLog.useSpreadsheet("1Wsg45k-KBy28AP-LM2WfSzHjpu-68JCrpjAs2K3U9kE");
    err = (typeof err === 'string') ? new Error(err) : err;
    Logger.log('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.', err.name || '',
            err.message || '', err.lineNumber || '', err.fileName || '', err.stack || '', '');
  };
}