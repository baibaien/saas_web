import { Injectable } from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class IndexService {

  constructor(public rootApiService: RootApiService) {
  }

// 首页预注册
  getPreSignUrl() {
    return `${this.rootApiService.getRootUrl()}/user/users/ad-pre-store`;
  }
}
