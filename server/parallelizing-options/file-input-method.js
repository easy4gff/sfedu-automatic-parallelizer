'use strict';

// Должно совпадать с айди того или иного метода из бд
const FileInputMethodType = {
    LOAD_FROM_LIBRARY: 1,
    LOAD_FROM_FILE_SYSTEM: 2,
    GET_FROM_TEXT_EDITOR: 3
}

module.exports = FileInputMethodType;