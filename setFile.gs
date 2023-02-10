function setFileDocument(doc) {
  sendText(telegram_ID, "начинается функция")
  let rr = UrlFetchApp.fetch(doc).getBlob()
  sendText(telegram_ID, "получен блоб")
  return DriveApp.getFolderById("1ngsjSu3vwPVLMg88f3tamgcD32xYAuRK").createFile(rr)
  
}
