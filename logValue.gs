/**
 * Функция записывает данные пользователя из таблицы в объект
 * @param {string} value массив данных пользователя из таблицы
 * @return {string} объект с данными пользователя
 */

/*
  ОБЛАСТЬ ТЕСТОВ
  ↓↓↓↓↓*/

function testTrigger() {
  trigger("1769978686", "object")
}

  /* ↑↑↑↑↑
  ОБЛАСТЬ ТЕСТОВ
  */

function logValue(value) {
  answers.telegram_ID = value[0];
  answers.username = value[1];
  answers.begining_at = value[2];
  answers.q1_start = value[3];
  answers.q1_answer = value[4];
  answers.q1_end = value[5];
      Logger.log(answers)
}




