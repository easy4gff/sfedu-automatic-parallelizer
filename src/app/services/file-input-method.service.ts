import { Injectable } from '@angular/core';
import { FileInputMethodType, FileInputMethod } from '../model/paralleizing-option/parallelizing-option.fileinput-method';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FileInputMethodService {
  public currentInputMethodType$: BehaviorSubject<FileInputMethodType> = new BehaviorSubject(null);

  public fileInputMethods: FileInputMethod[];

  constructor() {
    this.fileInputMethods = [
      new FileInputMethod(
        FileInputMethodType.LOAD_FROM_LIBRARY,
        {
          english: 'Choose sample from the library',
          russian: 'Выбор примера из библиотеки'
        }
      ),
      new FileInputMethod(
        FileInputMethodType.LOAD_FROM_FILE_SYSTEM,
        {
          english: 'Load file',
          russian: 'Загрузить файл'
        }
      ),
      new FileInputMethod(
        FileInputMethodType.GET_FROM_TEXT_EDITOR,
        {
          english: 'Type program text in the editor',
          russian: 'Ввод текста программы в редакторе'
        }
      )
    ];
  }

  public getOptionByType(type: FileInputMethodType): FileInputMethod {
    return this.fileInputMethods
      .reduce((acc, cur, ind, arr) => {
        return acc === null && cur.type === type ? cur : acc;
      }, null);
  }
}
