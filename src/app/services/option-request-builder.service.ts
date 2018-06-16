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
      formData,
      // {
      //   responseType: 'blob'
      // }
    ).subscribe((res: any) => {
      console.log(res);
      const blob = this.base64ToBlob(res.file);
      importedSaveAs(blob, res.filename);
      this.downloadFile(blob);
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

  base64ToBlob(base64: string): Blob {
    const contentType = base64.split(';')[0];

    const byteCharacters = atob(base64);

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], {type: contentType});
  }

}
