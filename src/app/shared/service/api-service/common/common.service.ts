import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class CommonService {
  public header: string;

  constructor(public rootApi: RootApiService) {
    this.header = rootApi.getRootUrl();
  }

  // 省下拉框
  getProvince() {
    return `${this.header}/user/city/get-provinces`;
  }

  // 市下拉框
  getCity(province_id) {
    return `${this.header}/user/city/${province_id}/get-cities`;
  }

  // 区下拉框
  getDistrict(city_id) {
    return `${this.header}/user/city/${city_id}/get-areas`;
  }
}
