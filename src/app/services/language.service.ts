import { Injectable } from '@angular/core';
import { Language } from '../model/language/language-class';
import { LanguageConstants, LanguageObject } from '../model/language/language-constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LanguageService {
  public currentLanguage: string = Language.RUSSIAN;
  public currentLanguage$: BehaviorSubject<string> = new BehaviorSubject(Language.RUSSIAN);

  constructor() {
    this.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  public get(langConst: LanguageObject): string {
    return langConst[this.currentLanguage];
  }

}
