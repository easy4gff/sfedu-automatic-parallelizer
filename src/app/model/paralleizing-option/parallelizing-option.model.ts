import { FileInputMethod } from './parallelizing-option.fileinput-method';
import { LanguageConstant } from '../language/language-constants';
import { LibraryExample } from '../library-code-example/library-example.model';

export class ParallelizingOptionModel {
    public id: number;
    public title: LanguageConstant;
    public fileInputsMethods: FileInputMethod[];
    public libraryExamples: LibraryExample[];
    public status?: boolean;
}
