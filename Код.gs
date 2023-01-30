let token = "5658994025:AAHvwoN91qZ3kqli_3w_CCdUpBg012z1-Ew";

function getMe() {
  let request = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/getMe");
  console.log(request.getContentText())
}

function setWebhook() {
  let webAppUrl = "https://script.google.com/macros/s/AKfycbwhROSNIo5rNu0BZaaShpls2FdsfhURztUd4k0EFPSJxa58hEa9Uwr7MAA0sciFPWQ/exec";
  let request = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebhook?url="+webAppUrl);
  console.log(request.getContentText())
}

function sendText(chat_id, text) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML"
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function send() {
  let chat_id = 1769978686;
  let text = "Hello, World!";
  sendText(chat_id, text)
}

function doPost(e) {
  let contents = JSON.parse(e.postData.contents);
  let chat_id = contents.message.chat.id;
  let text = contents.message.text;
  sendText(chat_id, text)
  SpreadsheetApp.openById("1va3441tSiz0z0lrZFwH5pBYUoxRENWbWZwtmjlPK2Qc").appendRow([chat_id, text]);
}