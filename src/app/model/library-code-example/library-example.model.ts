import { LanguageConstant } from '../language/language-constants';
import { CodeFile } from './library-example-codefile';

export class LibraryExample {
    public id: number;
    public label: LanguageConstant;
    public codefiles: CodeFile[];
}
