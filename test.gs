function testFunc() {
  return insertMultipleLinksInCell(13, 16)
}

function insertMultipleLinksInCell(row, start, end) {
  
  let richValue = SpreadsheetApp.newRichTextValue()
  let regex = /(https?:\/\/[\S]+)/ig;
  let cell;
  let arr = [];
  let setText;
  let setLink;

  if (end == null) {
    cell = sheetId.getRange(Number(row), Number(start))

    cell.getValue().match(regex)

    return Logger.log(cell.getValue().match(regex))

    let pos = -1;
    while ((pos = cell.getValue().indexOf("http", pos + 1)) != -1) {
      arr.push(pos)
    }

    setText = richValue.setText(cell.getValue())
    arr.forEach(element => {
      let firstIndex = element;
      let lastIndex = element + 134;
      
      let link = cell.getValue().slice(firstIndex, lastIndex)
        setLink = setText.setLinkUrl(firstIndex, lastIndex, link)
      Logger.log(link)
    })
    let build = setLink.build();
    cell.setRichTextValue(build);
  } else {
    for (let i = Number(start); i <= Number(end); i++) {
      cell = sheetId.getRange(Number(row), i);
      if (cell == "") return;

      let pos = -1;
      while ((pos = cell.getValue().indexOf("http", pos + 1)) != -1) {
        arr.push(pos)
      }


      setText = richValue.setText(cell.getValue())
      arr.forEach(element => {
        let firstIndex = element;
        let lastIndex = element + 134;
        
        let link = cell.getValue().slice(firstIndex, lastIndex)
        setLink = setText.setLinkUrl(firstIndex, lastIndex, link)
        Logger.log(link)
      })
      let build = setLink.build();
      cell.setRichTextValue(build);
    }
  }

    
  

  
  return

}
/*
    let pos = -1;
      while ((pos = range.getValue().indexOf("https", pos + 1)) != -1) {
        arr.push(pos)
      }

      let setText = "";
      let setLink = "";

        let richValue = SpreadsheetApp.newRichTextValue()
          setText = richValue.setText(range.getValue())
      //for (let i = 0; i < arr.length; i++) {
        arr.forEach(element => {
        let firstIndex = element;
        let lastIndex = element + 134;
        
        let link = range.getValue().slice(firstIndex, lastIndex)
          setLink = setText.setLinkUrl(firstIndex, lastIndex, link)
        Logger.log(link)
      })
      let build = setLink.build();
      range.setRichTextValue(build);
      Logger.log(arr)
      */

function sendChatAction(id, action) {

  if (!action) {
    action = "typing";
  }
  
  let data = {
        method: "post",
        payload: {
            method: "sendChatAction",
            chat_id: String(id),
            action: action,
        }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

