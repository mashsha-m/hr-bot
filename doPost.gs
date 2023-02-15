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
          "text": "/next"
     }
}

doPost(contents)
}*/

function doPost(e) {
  try {

    // возвращаемые данные при ответе от пользователя
    let contents = JSON.parse(e.postData.contents)

    // текст от пользователя
    let text = contents.message.text;

    // id пользователя
    let id = contents.message.chat.id;

    // username пользователя
    let username = contents.message.chat.username;

    // объект из картинки
    let file = contents.message.photo;

    // объект из документа
    let document = contents.message.document;

    // проверка на тг команду
    if ((/^\//.exec(text))) {

        if (text === '/start') {

          // по этой команде идет проверка, что пользователь ещё не записан в базу

          trigger(id, "rewrite")

          if (position == 0) {

            // вывод приветствия
            sendText(id, sheetIdQuestions.getRange(1,2).getValue())
            
          } else {

            // если записан, то программа не отправит приветствие заново
            return sendText(id, "Мы уже знакомы.");
            
          }

        } else if (text === '/begin') {
          
          // по этой команде идет проверка, что пользователь ещё не записан в базу

          trigger(id, "rewrite")

          if (position == 0) {

            // если не записан, то записываются его id, username и в статус вопроса назначается "q1" (первый вопрос)
            sheetId.appendRow([id, "@"+username, "q1"]);
            
            // отправляется первый вопрос
            sendQ(id, "q1", FORCE_REPLY)

          } else {

            // если записан, то программа не даст ему начать заново
            return sendText(id, "Ты уже начинал тестирование.");
            
          }

        } else if (text === '/next') {

        // по команде идет проверка, что на текущий вопрос есть ответ

        // проверка на заполненное поле предыдущего вопроса, если оно не заполнено, то просим ответить на вопрос и прерываем код
        trigger(id, "rewrite")

        findColTitle(id)
        
        // вычисляем текущий статус вопроса
        let current_status = sheetId.getRange(position+1, 3).getValue();
        
        // получаем текущее значение в столбце для фото 
        //let current_photo = sheetId.getRange(position+1, 26).getValue();
        
        if (column_title == "q11_end") {
          // тестирование завершено

          // защита, если пользователь пытается закончить тестироавние без скриншота
          return sendText(id, 'Это последний вопрос, на него будет приниматься только скриншот.')

        } else if (column_title == current_status) {

          // если незаполненное поле совпадает с текущим вопросом, то выводим сообщение и вопрос
          sendText(id, 'Последний вопрос остался без ответа.');
          return sendQ(id, column_title, FORCE_REPLY)

        } 

        // при наличии ответа, в следующую ячейку (*вопрос*_end) записываем дату, когда на вопрос закончили отвечать
        reAnswer(id, column_title, dateFormat, "is_date")

        findColTitle(id)

        // это условие выполняет тот же сценарий, что команда /finish при условии, что статус вопроса не соответствует ни одному известному
        if (column_title == "" || column_title == "status") {

          return theEnd(id)

        }
        
        // определяем номер следующего вопроса и отправляем вопрос
        for (let i = 0; i < qTitles.length; i++) {
          if (qTitles[i] == column_title) {

          reAnswer(id, "status", column_title, "is_status")

          return sendQ(id, column_title, FORCE_REPLY)

          }
        }
      }

    } else {

      // в это условие приходит строковое сообщение от пользователя

      // отлов картинки
      if (file) {

        // переменная берет id картинки с самым большим качеством из пришедших данных 
        let file_id = file.at(-1).file_id;

        getFile(file_id, id)

      }

      // отлов документа
      if (document) {
        
        // переменная берет id документа
        let doc_id = document.file_id;

        getFile(doc_id, id);

      }

      // проверка на ключевые слова
      if (text == "Прочитано" || text == "прочитано") {
        
        // отправляем вопрос по сценарию
        sendQ(id, "check", FORCE_REPLY)

        return reAnswer(id, "status", "read", "is_status")

      } else if (text == "Поехали" || text == "поехали") {

          trigger(id, "rewrite")

          // получаем текущий статус вопроса
          let current_title = sheetId.getRange(position+1, 3).getValue();

          // защита от перезаписи даты для последнего вопроса
          if (current_title == "last") {

            return sendText(id, "Задание уже выполняется.")

          }

          // отправляем ссылку и сообщение
          sendQ(id, "get_link")
          sendQ(id, "timer", FORCE_REPLY)

          // записываем последнее сообщение ради записи даты вопроса
          reAnswer(id, titles[0].at(-3), ("["+dateFormat+"] "+text), "is_date")

          // присваиваем последний статус вопроса для защиты
          return reAnswer(id, "status", "last", "is_status")
          
      } else if (words.includes(text)) {

        // фича
        return sendText(id, "Спасибо! (´｡• ω •｡`)")

      } else {

        // если строковое сообщение от прользователя не кодовое слово, то обрабатываем его индивидуально
        trigger(id, "rewrite")

        // можно что-то вывести для пользователя, который ещё не проходил тестирование
        if (position == 0) {

          return sendText(id, "дратуй")

        }
        
        // получаем текущий статус вопроса
        let current_title = sheetId.getRange(position+1, 3).getValue();

        // проверки на каждом этапе тестирования
        if (current_title == "q2") {

          // проверка номера телефона на валидность при 2 вопросе
          if (PHONE_REGEXP.test(text) == false) {
            return sendText(id, "Формат номера не подходит.")
          } else {
            return reAnswer(id, current_title, "["+dateFormat+"] "+text);
          }

        } else if (current_title == "q3") {

          // проверка email'а на валидность при 3 вопросе
          if (EMAIL_REGEXP.test(text) == false) {
            return sendText(id, "Формат email не подходит.")
          } else {
            return reAnswer(id, current_title, "["+dateFormat+"] "+text);
          }

        } else if (current_title == "q4") {

          // проверка отправляемого документа на 4 вопросе
          if (text) {
            return sendText(id, "Это не файл.")
          }

        } else if (current_title == "q11") {

          // защита при попытке отправить текст вместо скриншота на 11 вопросе
          return sendText(id, 'Если задание прочитано и понято, то напиши боту: "Прочитано".')

        } else if (current_title == "read") {

          // защита при попытке отправить текст вместо скриншота на 11 вопросе
          return sendText(id, 'Начинаем? Если да, то напиши "Поехали" и ты получишь ссылку на тест.')

        } else if (current_title == "last") {

          // получаем текущее значение в столбце для фото 
          let current_photo = sheetId.getRange(position+1, 26).getValue();

          // проверка, если на последнем вопросе при отсутствии фотографии пытаются отправить текст
          if (current_photo == "") {
            return sendText(id, "Это не скриншот. Пришли, пожалуйста скриншот.")
          } else {
            //return sendText(id, 'Чтобы завершить тестирование, отправь /next')
            return false;
          }

        } else {

          // после всех проверок ответ записывается только в том случае, когда он содержит текст
          if ((text !== "") && (typeof document === 'undefined') && (typeof file === 'undefined')) {
            //sendText(id, text)
            return reAnswer(id, current_title, "["+dateFormat+"] "+text);
          }

        }
      }
    }
  } catch (err) {

    // логирование ошибок
    Logger = BetterLog.useSpreadsheet("1Wsg45k-KBy28AP-LM2WfSzHjpu-68JCrpjAs2K3U9kE");
    err = (typeof err === 'string') ? new Error(err) : err;
    Logger.log('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.', err.name || '',
            err.message || '', err.lineNumber || '', err.fileName || '', err.stack || '', '');

  };
}