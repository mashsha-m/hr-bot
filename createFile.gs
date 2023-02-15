function test() {
  createFile("https://api.telegram.org/file/bot5658994025:AAHvwoN91qZ3kqli_3w_CCdUpBg012z1-Ew/documents/file_109.docx", "1769978686", "documents/file_109.docx")
}

function createFile(doc, telegram_ID, file_path, current_status) {

let re = /documents\//gi;
let fileName = file_path.replace(re, '');
let fileId = "";

  //Logger.log(newstr)

  let blob = UrlFetchApp.fetch(doc);
  //Logger.blob)
  let drive = DriveApp.getFolderById("1ngsjSu3vwPVLMg88f3tamgcD32xYAuRK");
  
  drive.createFile(blob)
  

  //let blob = UrlFetchApp.fetch("https://api.telegram.org/file/bot5658994025:AAHvwoN91qZ3kqli_3w_CCdUpBg012z1-Ew/documents/file_109.docx");

  while (drive.getFiles().hasNext()) {
    const file = drive.getFiles().next()
    if (file.getName() == fileName) {
      fileId = file.getId()
      file.setTrashed(true)
      break;
    }
  }

  DriveApp.getFileById(fileId).makeCopy(`${telegram_ID}--${current_status}`, drive)

    let copy = drive.getFilesByName(`${telegram_ID}--${current_status}`)

    let newId = "";

while (copy.hasNext()) {
    const file = copy.next()
  newId = file.getId()
  }

  fileLink = "https://docs.google.com/document/d/"+newId+"/edit?usp=share_link&ouid=101704405535539299352&rtpof=true&sd=true"
  return reAnswer(telegram_ID, current_status, "["+dateFormat+"] "+ fileLink)
}
