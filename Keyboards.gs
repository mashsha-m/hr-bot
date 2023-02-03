let FIRST_Q = {
  "inline_keyboard": [
    [{ "text": "2", 'callback_data': "vairable 2", 'URL': 'https://script.google.com/home/projects/1KFajtSt0Oan2YCZK7UkIUnR_ib9RTM5X5pUhBBdKFmJ29_JRddf0djYv/edit' }, { "text": "10", 'callback_data': "vairable 2" }],
  ]
};

let POLLy_KEYBOARD = {
  "keyboard": [
    [{ "text": "2" }, { "text": "10" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
  "remove_keyboard": true
};

let CUSTOM_KEYBOARD2 = {
  "keyboard": [
    [{ "text": "Кнопка 1" }, { "text": "Кнопка 2" }]
  ],
  "resize_keyboard": true
};

let CUSTOM_KEYBOARD3 = {
  "keyboard": [
    [{ "text": "Кнопка 1" }, { "text": "Кнопка 2" }],
    [{ "text": "Кнопка 3" }, { "text": "Кнопка 4" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
};

let CUSTOM_KEYBOARD4 = {
  "keyboard": [
    [{ "text": "Кнопка 1" }, { "text": "Кнопка 2" }],
    [{ "text": "Кнопка 3" }, { "text": "Кнопка 4" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
  "input_field_placeholder": "Текст - подсказка"
};

let CUSTOM_KEYBOARD5 = {
  "keyboard": [
    [{ "text": "Кнопка 1 ❤️" }, { "text": "Кнопка 2 ✨" }],
    [{ "text": "Кнопка 3 🆗" }, { "text": "Кнопка 4 🔥" }, { "text": "Кнопка 5 ✔️" }],
    [{ "text": "Кнопка 6 ❤️‍🔥" }, { "text": "Кнопка 7 🏁" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
};

let REMOVE_KEYBOARD = {
  remove_keyboard: true
};

let PHONE_No = {
  "keyboard": [
    [{ "text": "Отправить номер ☎️️", 'request_contact': true }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
};

let LOCATION_KEYBOARD = {
  "keyboard": [
    [{ "text": "Отправить местоположение 🗺️️", 'request_location': true }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
};

let POLL_KEYBOARD = {
  "keyboard": [
    [{ "text": "Опрос", 'request_poll': {} }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
};

let POLL_KEYBOARD2 = {
  "keyboard": [
    [{ "text": "Опрос", 'request_poll': { type: "quiz" } }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
};

let POLL_KEYBOARD3 = {
  "keyboard": [
    [{ "text": "Опрос", 'request_poll': { type: "regular" } }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
};

let URL_KEYBOARD = {
  "inline_keyboard": [
    [{ "text": "Проверить почту", 'url': "mail.ru" }]
  ]
};

let SWITCH_INLINE = {
  "inline_keyboard": [
    [{ "text": "Кнопка 1", 'switch_inline_query_current_chat': 'мой текст' }, { "text": "Кнопка 2", 'callback_data': "Кнопка 2" }]
  ]
};

let FORCE_REPLY = {
  "force_reply": true,
  "input_field_placeholder": "Ваш текст"
};