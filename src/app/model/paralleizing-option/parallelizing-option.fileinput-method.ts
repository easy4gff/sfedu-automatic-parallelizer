import { LanguageConstant } from '../language/language-constants';

// This values should match the values in database
export enum FileInputMethodType {
    LOAD_FROM_LIBRARY = 1,
    LOAD_FROM_FILE_SYSTEM = 2,
    GET_FROM_TEXT_EDITOR = 3
}

export class FileInputMethod {
    constructor(
        public type: FileInputMethodType,
        public title: LanguageConstant,
    ) {}
}
