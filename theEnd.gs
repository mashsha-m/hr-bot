function func() {
  theEnd("1769978686")
}


function theEnd(id) {
  newArr = [];
  trigger(id, "object");
  //Logger.log(arr[0].at(-2))
  for (let char of arr[0].at(-3)) {
    if (char == "]") {
      break;
    } else if (char == "[") {
      continue;
    } else {
      newArr.push(char)
    }
  }
  let string = newArr.join('')
  // смотрим, чтобы было не больше 2700 (45 минут)
  let dat1 = new Date(arr[0].at(-2))
  
  let dat2 = new Date(string)
  let difference = (dat1 - dat2) / 1000
  if (difference > 2700) {
    Logger.log("Слишком поздно. Время вышло. Тестирование завершено.")
    reAnswer(id, "photo", "", "is_status")
  } else {
    trigger(id, "Спасибо, что выполнили задание вовремя! Мы обязательно рассмотрим ваш отклик.");
  }
}
