import { Injectable } from '@angular/core';
import { LoadingBarComponent } from './loading-bar.component';
import {Observable} from "rxjs/Observable";

/*
  注入service后调用open即弹出，
*/
@Injectable()
export class LoadingBarService {
  public static loading: LoadingBarComponent;
  public loading_state = new Observable();
  constructor() {
  }

  open(): void {
    LoadingBarService.loading.open();
  }

  close(): void {
    LoadingBarService.loading.close();
  }

  getLoadingState() {
    return this.loading_state;
  }
}
