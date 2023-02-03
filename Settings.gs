// токен для подключения к боту
const token = SpreadsheetApp.openById("1R3JlbU5lDnGoUIhgSOpiDOlJEunE6IUevDjF5UswRz4").getSheetByName("Лист1").getRange(2,2).getValue();
// рабочая таблица
let sheetId = SpreadsheetApp.openById("1Wsg45k-KBy28AP-LM2WfSzHjpu-68JCrpjAs2K3U9kE").getSheetByName("Ответы");
// таблица для тестов
let sheetIdTest = SpreadsheetApp.openById("1va3441tSiz0z0lrZFwH5pBYUoxRENWbWZwtmjlPK2Qc").getSheetByName("Mess");
// координата колонки, для которой делается запись
let position = 0;
// массив из заголовков колонок, из которых будет вычисляться нужная для записи
let titles = sheetId.getRange(1, 1, 1, sheetId.getLastColumn()).getValues();
// объект с данными пользователя
let answers = {
  telegram_ID: "",
  username: "",
  begining_at: "",
  q1_start: "",
  q1_answer: "",
  q1_end: "",
}

function getMe() {
  let request = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/getMe");
  console.log(request.getContentText())
}

function setWebhook() {
  let webAppUrl = SpreadsheetApp.openById("1R3JlbU5lDnGoUIhgSOpiDOlJEunE6IUevDjF5UswRz4").getSheetByName("Лист1").getRange(3,2).getValue();
  let request = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebhook?url="+webAppUrl);
  console.log(request.getContentText())
}