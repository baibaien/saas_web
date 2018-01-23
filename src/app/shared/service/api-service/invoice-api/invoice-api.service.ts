import { Injectable } from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class InvoiceApiService {

  constructor(public rootApiService: RootApiService) {}
  getUninvoiced() {
    return `${this.rootApiService.getRootUrl()}/invoice/uninvoiced`;
  }
  getWaitInvoiced() {
    return `${this.rootApiService.getRootUrl()}/invoice/wait`;
  }
  getInvoiced() {
    return `${this.rootApiService.getRootUrl()}/invoice/invoiced`;
  }
  getApplyInvoice() {
    return `${this.rootApiService.getRootUrl()}/invoice/apply`;
  }
}
