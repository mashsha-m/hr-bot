/**
 * Функция сравневает затраченное на тест время
 * @param {number} id id пользователя, которому будет отправлено сообщение
 * @return JSON запрос в телеграм
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testTheEnd() {
  theEnd("1769978686")
}

/* ↑↑↑↑↑
ОБЛАСТЬ ТЕСТОВ
*/

function theEnd(id) {

  // массив для выборки даты из строки с ответом 
  newArr = [];

  trigger(id, "object");
  
  for (let char of arr[0].at(-3)) {
    if (char == "]") {
      break;
    } else if (char == "[") {
      continue;
    } else {
      newArr.push(char)
    }
  }

  // перезапись массива в строку
  let string = newArr.join('')

  // дата из колонки q11_end
  let dat1 = new Date(arr[0].at(-2))

  // дата из колонки q11
  let dat2 = new Date(string)

  // разница во времени (в секундах)
  let difference = (dat1 - dat2) / 1000

  if (difference > 2700) {
    return sendText(id, "Слишком поздно. Время вышло. Тестирование завершено.")
  } else {
    return sendText(id, "Спасибо за своевременное выполнение задания! Результаты будут переданы Анатолию на рассмотрение.");
  }
}
