import { FileInputMethod } from './parallelizing-option.fileinput-method';
import { LanguageConstant } from '../language/language-constants';
import { LibraryExample } from '../library-code-example/library-example.model';

// Метод распараллеливания
export class ParallelizingOptionModel {
    // Идентификатор метода
    public id: number;
    // Название опции
    public title: LanguageConstant;
    // Методы ввода программы
    public fileInputsMethods: FileInputMethod[];
    // Примеры из библиотеки примеров исходного кода
    public libraryExamples: LibraryExample[];
    // Статус опции
    public status?: boolean;
}
