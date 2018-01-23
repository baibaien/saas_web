import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class HrChangeService {
  // 人事变动接口设置
  constructor(public rootApiService: RootApiService) {
  }

  getDimissionSettings(yg_id) {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/create-staff-status/?yg_id=${yg_id}`;
  }

  getCreateWork(yg_id) {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/create-work/?${yg_id}`;
  }

  // 人事变动api post
  getHrChangeStore() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-work`;
  }

  // 薪资变动   post
  getHrChangeSalary() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-salary`;
  }

  // 福利变动   post
  getHrChangeBenifit() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-benifit`;
  }

  // 社保变动   post
  getHrChangeSocial() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-social`;
  }

  // 用户状态变动
  getHrChangeStatus() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/store-staff-status`;
  }

  // 人事变动记录列表
  getHrChangeLog() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change`;
  }

  // 取消批量上传
  getRevokeChange() {
    return `${this.rootApiService.getRootUrl()}/staff/hr-yg-hr-change/update-revoke`;
  }
  // -->更新员工入职转正日期
  getHireFormalDateUpload() {
    return `${this.rootApiService.getRootUrl()}/staff/staffs/update-hire-date`;
  }
  // <-----

  // 离职薪酬结算页
  getChangeSalary(yg_id, fire_date) {
    return `${this.rootApiService.getRootUrl()}/staff/leave-settle-page?yg_id=${yg_id}&fire_date=${fire_date}`;
  }

  // 计算离职薪酬
  calcChangeSalary() {
    return `${this.rootApiService.getRootUrl()}/staff/leave-settle`;
  }
}

