import { LanguageConstant } from '../language/language-constants';
import { CodeFile } from './library-example-codefile';

// Пример из библиотеки примеров исходного кода
export class LibraryExample {
    // Идентификатор
    public id: number;
    // Название примера
    public label: LanguageConstant;
    // Массив представлений файла с кодом
    public codefiles: CodeFile[];
}
