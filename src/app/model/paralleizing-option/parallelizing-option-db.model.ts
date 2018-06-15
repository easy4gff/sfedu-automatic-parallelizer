import { LanguageConstant } from '../language/language-constants';
import { FileExtension } from './parallelizing-option-file-extension';

export class ParallelizingOptionDBModel {
    // Идентификатор метода
    public id: number;
    // Название опции
    public title: LanguageConstant;
    // Методы ввода программы
    public fileInputsMethodsIds: number[]; // description?
    // Статус опции
    public status: boolean;
    // Производимые и результирующие расширения
    public extensions: FileExtension[];
    // Командная строка для запуска исполняемого файла
    public commandLine: string;
}
