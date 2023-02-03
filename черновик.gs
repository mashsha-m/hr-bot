let position = 0;

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testTrigger() {
  trigger("1769978686", "object")
}

  /* ↑↑↑↑↑
  ОБЛАСТЬ ТЕСТОВ
  */
function reAnswer(telegram_ID = "1725596821", column = 'q1_answer', newValue = "Другое значение") {

  let titles = sheetId.getRange(1, 1, 1, sheetId.getLastColumn()).getValues();

  /*titles.forEach(function(value) { решение хорошее, но не дает узнать цифрами место в массиве, то есть координаты по таблице
   value.forEach(function (val) {
    if (val == column) {
      let co = sheetId.getRange(1, 1, 1, sheetId.getLastColumn()).getValues()
    }
   })
 });*/
  titles.forEach(function(title) {
    for (i = 0; i < title.length; i++) {
      //Logger.log(title[i])
      if (title[i] == column) {
        trigger(telegram_ID, "rewrite")
        sheetId.getRange(position+1, i+1).setValue(newValue)
      }
    }
  });
  
}

function sendText(chat_id, text, keyBoard) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
  
}

function send() {
  let chat_id = 1769978686;
  let text = "Hello, World!";
  //sheetId.getRange(2,2).setValue(JSON.stringify(Date("[hh]:[mm]:[ss].000"), null, 5));
  sendText(chat_id, text, FIRST_Q)
}

function trigger(u, action) {
  let titles = sheetId.getRange(1, 1, 1, sheetId.getLastColumn()).getValues();
  let end = false;
  let range = sheetId.getRange(1, 1, sheetId.getLastRow(), 1).getValues();
  //Logger.log(titles);
  for (let i = 0; i < range.length; i++) {
    for (let j = 0; j < range[i].length; j++) {
      if (range[i][j] == u) {
        if (action == "rewrite") {
          position = i;
        }
        if (action == "object") {
          arr = sheetId.getRange(i+1, j+1, 1, sheetId.getLastColumn()).getValues();
          arr.forEach(logValue); /*составить объект из данных по соответствующему пользователю*/
        }
        if (action == null) {
          Logger.log("Всё получилось")
        }
      end = true;
      }
    }
      if (end == true) {
        break;
      }
  }
  //Logger.log(range[0].length);
}

let answers = {
  telegram_ID: "",
  username: "",
  begining_at: "",
  q1_start: "",
  q1_answer: "",
  q1_end: "",
}

function logValue(value) {
  answers.telegram_ID = value[0];
  answers.username = value[1];
  answers.begining_at = value[2];
  answers.q1_start = value[3];
  answers.q1_answer = value[4];
  answers.q1_end = value[5];
      Logger.log(answers)
}




