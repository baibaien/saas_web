import { Injectable } from '@angular/core';
import {HttpService} from '../http-service/http.service';
import {IndexService} from '../api-service/index/index.service';

@Injectable()
export class SaasIndexService {
  public pre_sign_url;
  public pre_sign_source;
  constructor(public httpService: HttpService,
  public indexService: IndexService) { }
  preSign(data_source) {
    console.log(data_source);
    this.pre_sign_url = this.indexService.getPreSignUrl();
    this.pre_sign_source = this.httpService.myJsonp(this.pre_sign_url, {params: data_source});
    return this.pre_sign_source;
  }

}
