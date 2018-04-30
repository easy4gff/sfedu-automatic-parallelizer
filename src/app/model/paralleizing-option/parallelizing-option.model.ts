import { FileInputMethod } from './parallelizing-option.fileinput-method';
import { LanguageObject } from '../language/language-constants';
import { LibraryExample } from '../library-code-example/library-example.model';

export class ParallelizingOptionModel {
    public id: number;
    public title: LanguageObject;
    public fileInputsMethods: FileInputMethod[];
    public libraryExamples: LibraryExample[];
}
