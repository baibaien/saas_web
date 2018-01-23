import { Injectable } from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class OrganizationsService {
  // 组织架构API
  constructor(public rootApiService: RootApiService) {
  }
  // 列表  GET
  // 查看  get    url/id
  // 删除 delete    url/id
  getOrganizations() {
    return `${this.rootApiService.getRootUrl()}/user/organizations`;
  }
  getOrganizationsUpdate(id) {
    return `${this.rootApiService.getRootUrl()}/user/organizations/${id}/update`;
  }
  // 添加  POST
  getOrganizationsStore() {
    return `${this.rootApiService.getRootUrl()}/user/organizations/store`;
  }

}
