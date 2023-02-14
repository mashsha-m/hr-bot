// токен для подключения к боту
const token = SpreadsheetApp.openById("1R3JlbU5lDnGoUIhgSOpiDOlJEunE6IUevDjF5UswRz4").getSheetByName("Лист1").getRange(2,2).getValue();
// рабочая таблица
const sheetId = SpreadsheetApp.openById("1Wsg45k-KBy28AP-LM2WfSzHjpu-68JCrpjAs2K3U9kE").getSheetByName("Ответы");
// таблица с вопросами 
const sheetIdQuestions = SpreadsheetApp.openById("1Wsg45k-KBy28AP-LM2WfSzHjpu-68JCrpjAs2K3U9kE").getSheetByName("Вопросы");
// таблица для тестов
const sheetIdTest = SpreadsheetApp.openById("1va3441tSiz0z0lrZFwH5pBYUoxRENWbWZwtmjlPK2Qc").getSheetByName("Mess");
// регулярное выражение для email
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
// регулярное выражение для телефона
const PHONE_REGEXP = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/iu;
// координата колонки, для которой делается запись
let position = 0;
// название заполняемой колонки 
let column_title = "";
    let emptyGet = 0;
// массив из заголовков колонок, из которых будет вычисляться нужная для записи
const titles = sheetId.getRange(1, 1, 1, sheetId.getLastColumn()).getValues();
// массив из заголовков вопросов для вывода
const qTitles = sheetIdQuestions.getRange(2, 1, sheetIdQuestions.getLastRow(), 1).getValues();
// массив из вопросов для вывода
const questions = sheetIdQuestions.getRange(2, 2, sheetIdQuestions.getLastRow(), 2).getValues();
// массив слов для принятия благодарности
const words = ["Молодец", "молодец", "молодец!", "Молодец!", "хвалю", "Хвалю", "хвалю!", "Хвалю!", "умничка", "Умничка"];
// объект с данными пользователя
let answers = {
  telegram_ID: "",
  username: "",
  begining_at: "",
  q1_start: "",
  q1_answer: "",
  q1_end: "",
}
// удобный формат даты
let date = new Date()
let getMonth = date.toLocaleString("default", { month: "2-digit" });
let getDay = date.toLocaleString("default", { day: "2-digit" });
let getYear = date.toLocaleString("default", { year: "numeric" });
let getHours = date.toLocaleString("default", { 
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',});
let dateFormat = getYear + "." + getMonth + "." + getDay + " " + getHours;

function getMe() {
  let request = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/getMe");
  console.log(request);
}

function setWebhook() {
  let webAppUrl = SpreadsheetApp.openById("1R3JlbU5lDnGoUIhgSOpiDOlJEunE6IUevDjF5UswRz4").getSheetByName("Лист1").getRange(3,2).getValue();
  let request = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebhook?url="+webAppUrl);
  console.log(request.getContentText())
}