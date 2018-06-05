import { LanguageConstant } from '../language/language-constants';

// Данные значения должны совпадать со значениями из базы данных

// Перечислимый тип способов задания кода
export enum FileInputMethodType {
    LOAD_FROM_LIBRARY = 1,
    LOAD_FROM_FILE_SYSTEM = 2,
    GET_FROM_TEXT_EDITOR = 3
}

// Способ задания кода
export class FileInputMethod {
    constructor(
        // Тип
        public type: FileInputMethodType,
        // Мультиязычная константа названия
        public title: LanguageConstant,
    ) {}
}
