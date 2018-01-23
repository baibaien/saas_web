import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class CompanySettingsService {
  public header: string;
  public header_wxl: string;
  public header_wyt: string;


  constructor(public rootApiService: RootApiService) {
    this.header = this.rootApiService.getRootUrl();
    this.header_wxl = this.rootApiService.getRootUrl();
    this.header_wyt = this.rootApiService.getRootUrl();

  }

  // 合同公司列表 get
  getContractCompnies(id: any = '') {
    return `${this.header}/user/contract-companies/${id}`;
  }

  // 添加合同公司
  addContractCompanies() {
    return `${this.header}/user/contract-companies/store`;
  }

  // 更新合同公司
  updateContractCompanies(id) {
    return `${this.header}/user/contract-companies/${id}/update`;
  }

  // 福利管理列表
  getBenifit() {
    return `${this.header_wxl}/salary/benifit`;
  }
  deleteBenifit(id) {
    return `${this.header_wxl}/salary/benifit/del?id=${id}`;
  }
  // 添加福利管理
  addBenifit() {
    return `${this.header_wxl}/salary/benifit/create`;
  }

  // 更新福利
  updateBenifit() {
    return `${this.header_wxl}/salary/benifit/edit`;
  }

  // 福利详情页
  getBenifitItem() {
    return `${this.header_wxl}/salary/benifit/detail`;
  }
  // 公司办公地址
  getOfficeAddress(id: any = '') {
    return `${this.header}/user/office-addresses/${id}`;
  }
  // 添加办公地址
  addOfficeAddress() {
    return `${this.header}/user/office-addresses/store`;
  }
  // 更新办公地址
  updateOfficeAddress(id) {
    return `${this.header}/user/office-addresses/${id}/update`;
  }
  // 公司岗位列表
  getPositionList(id: any = '') {
    return `${this.header}/user/hr-gs-zhiwei/${id}?is_all_display=1`;
  }
  addPosition() {
    return `${this.header}/user/hr-gs-zhiwei/store`;
  }
  updatePosition(id) {
    return `${this.header}/user/hr-gs-zhiwei/${id}/update`;
  }

  updateYgSelf() {
    return `${this.header}/user/users/update-self-help`;
  }
  getYgself() {
    return `${this.header}/user/users/update-self-help-form`;
  }
  getSocialRule() {
    return `${this.header}/user/hr-securities/social-index`;
  }
  getSocialDetail(city_id, rule_id) {
    return `${this.header}/user/hr-base/social-show?city_id=${city_id}&rule_id=${rule_id}`;
  }
  getFundRule() {
    return `${this.header}/user/hr-securities/fund-index`;
  }
  getFundDetail(city_id, rule_id) {
    return `${this.header}/user/hr-base/fund-show?city_id=${city_id}&rule_id=${rule_id}`;
  }
  getSalaryRule() {
    return `${this.header_wyt}/salary/rule/show`;
  }
  getModalSalaryRule() {
    return `${this.header_wyt}/salary/rule/show/salary`;
  }
  getModalSalaryBasic() {
    return `${this.header_wyt}/salary/rule/show/basic`;
  }
  updateSalaryRule() {
    return `${this.header_wyt}/salary/rule/salary`;
  }
  updateSalaryBase() {
    return `${this.header_wyt}/salary/rule/basic`;
  }
  benifitCoverMoney() {
    return `${this.header_wxl}/salary/benifit/cover`;
  }
  isBenifitConver() {
    return `${this.header_wxl}/salary/benifit/change`;
  }

}
