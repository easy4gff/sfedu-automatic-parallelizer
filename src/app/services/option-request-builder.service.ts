import { Injectable } from '@angular/core';
import {
  ParallelizingOptionData,
  ParallelizingOptionDataLibraryExampleId,
  ParallelizingOptionDataSourceCode,
  ParallelizingOptionDataUserFiles
} from '../model/paralleizing-option/parallelizing-option-data';
import { ParallelizingOptionType } from '../model/paralleizing-option/parallelizing-option-type';
import { HttpClient } from '@angular/common/http';
import { FileInputMethodService } from './file-input-method.service';
import { saveAs as importedSaveAs } from 'file-saver';

const SERVER_API = '/api';
const SERVICE_CONTROLLER = '/parallelize';

@Injectable()
export class OptionRequestBuilderService {
  public currentOptionType: ParallelizingOptionType;
  public optionData: ParallelizingOptionData;

  constructor(
    private http: HttpClient,
    private inputMethodService: FileInputMethodService
  ) { }

  sendRequest() {
    console.log({
      optionId: this.currentOptionType,
      payload: this.optionData
    });

    const formData: FormData = new FormData();
    this.preparePayload(formData);

    this.http.post(SERVER_API + SERVICE_CONTROLLER, /*{
      optionTypeId: this.currentOptionType,
      optionData: this.optionData
    }*/
      formData/*,
      {
        headers: {
        'Content-Type': undefined
        }
      }*/
      , {
        responseType: 'blob'
      }
    ).subscribe(res => {
      console.log(res);
      importedSaveAs(res);
      this.downloadFile(res);
    });
  }

  private preparePayload(formData: FormData): void {
    formData.append('optionTypeId', this.currentOptionType.toString());
    formData.append('inputMethodId', this.inputMethodService.currentInputMethodType$.getValue().toString());
    if (this.optionData instanceof ParallelizingOptionDataLibraryExampleId) {
      formData.append('libraryExampleId', this.optionData.libraryExampleId.toString());
    } else if (this.optionData instanceof ParallelizingOptionDataSourceCode) {
      formData.append('sourceCode', this.optionData.code);
    } else if (this.optionData instanceof ParallelizingOptionDataUserFiles) {
      formData.append('countFiles', this.optionData.files.length.toString());
      for (let i = 0; i < this.optionData.files.length; ++i) {
        formData.append('file' + i, this.optionData.files[i], this.optionData.files[i].name);
      }
    } else {
        console.error('Incorrect parallelizing method payload');
    }
  }

  private downloadFile(data: Object) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
