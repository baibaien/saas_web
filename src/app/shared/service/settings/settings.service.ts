import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {AccountSettingsService} from "../api-service/account-settings/account-settings.service";
import {CommonService} from "../api-service/common/common.service";
import {CompanySettingsService} from "../api-service/company-settings/company-settings.service";
import {SalaryApiService} from "../api-service/salary-api/salary-api.service";
import {HttpService} from "../http-service/http.service";

@Injectable()
export class SettingsService {
  public get_userinfo_url: string;
  public get_userinfo_source: Observable<any>;
  public update_signInfo_url: string;
  public update_signInfo_source: Observable<any>;
  public get_city_source: Observable<any>;
  public get_city_url: string;
  public get_district_source: Observable<any>;
  public get_district_url: string;
  public get_province_source: Observable<any>;
  public get_province_url: string;
  public get_captcha_source: Observable<any>;
  public get_captcha_url: string;
  public update_contact_url: string;
  public update_contact_source: Observable<any>;
  public update_pw_url: string;
  public update_pw_source: Observable<any>;
  public update_mobile_url: string;
  public update_mobile_source: Observable<any>;
  public update_fapiao_url: string;
  public update_fapiao_source: Observable<any>;
  public add_send_url: string;
  public add_send_source: Observable<any>;
  public update_send_url: string;
  public update_send_source: Observable<any>;
  public add_contract_company_url: string;
  public add_contract_company_source: Observable<any>;
  public get_contract_company_url: string;
  public get_contract_company_source: Observable<any>;
  public update_contract_company_url: string;
  public update_contract_company_source: Observable<any>;
  public add_benifit_url: string;
  public add_benifit_source: Observable<any>;
  public get_benifit_url: string;
  public get_benifit_source: Observable<any>;
  public update_benifit_url: string;
  public update_benifit_source: Observable<any>;
  public get_benifit_item_url: string;
  public get_benifit_item_source: Observable<any>;
  public add_office_addr_url: string;
  public add_office_addr_source: Observable<any>;
  public get_office_addr_url: string;
  public get_office_addr_source: Observable<any>;
  public update_office_addr_url: string;
  public update_office_addr_source: Observable<any>;
  public get_office_addr_item_url: string;
  public get_office_addr_item_source: Observable<any>;
  public update_ygself_url: string;
  public update_ygself_source: Observable<any>;
  public get_positionlist_url: string;
  public get_posiitionlist_source: Observable<any>;
  public add_position_url: string;
  public add_position_source: Observable<any>;
  public update_position_url: string;
  public update_position_source: Observable<any>;

  public get_ygself_url: string;
  public get_ygself_source: Observable<any>;
  public get_social_rule_url: string;
  public get_social_rule_source: Observable<any>;
  public get_social_detail_url: string;
  public get_social_detail_source: Observable<any>;
  public get_fund_detail_url: string;
  public get_fund_detail_rule_source: Observable<any>;
  public get_fund_rule_url: string;
  public get_fund_rule_source: Observable<any>;
  public get_salary_rule_url: string;
  public get_salary_rule_source: Observable<any>;
  public get_modal_salarybase_rule_url: string;
  public get_modal_salarybase_rule_source: Observable<any>;
  public get_modal_salary_rule_url: string;
  public get_modal_salary_rule_source: Observable<any>;
  public update_salary_rule_url: string;
  public update_salary_rule_source: Observable<any>;
  public update_salarybase_rule_url: string;
  public update_salarybase_rule_source: Observable<any>;
  public get_send_addr_url: string;
  public get_send_addr_source: Observable<any>;

  public benifitcover_money_url: string;
  public benifitcover_money_source: Observable<any>;
  public is_benifitcover_url: string;
  public is_benifitcover_source: Observable<any>;


  // // 获取计算工资首页的信息变量
  // public salary_calc_emit = new EventEmitter();
  // public salaryCalcSource: Observable<any>;
  // public salary_calc_url;
  //
  // // --> 获取员工薪资列表
  // public staffSalarySource: Observable<any>;
  // public staff_salary_emit = new EventEmitter();
  // public staff_salary_params = new URLSearchParams();
  // public staff_salary_url;
  // // <--
  //
  // // -->获取员工工资详情
  // public detailSalarySource: Observable<any>;
  // public detail_salary_emit = new EventEmitter();
  // public detail_salary_params = new URLSearchParams();

// -->默认tag
  public default_tag = 1;
// <-----
  constructor(public http: Http,
              public accountSettingsService: AccountSettingsService,
              public commonService: CommonService,
              public httpService: HttpService,
              public companySeetingsService: CompanySettingsService,
              public salaryApiService: SalaryApiService) {
    // this.salaryCalcSource = this.httpService.myPost(this.salaryApiService.getCalcSalary(), '');
    // this.staffSalarySource = this.httpService.myGet(this.salaryApiService.getStaffSalary());

  }
  setDefault(tag) {
    this.default_tag = tag;
  }
  getDefault() {
    return this.default_tag;
  }

  // 用户帐户设置页面 get
  getUserInfo() {
    this.get_userinfo_url = this.accountSettingsService.getUserInfo();
    this.get_userinfo_source = this.httpService.myGet(this.get_userinfo_url);
    return this.get_userinfo_source;
  }

  // 签约信息更新 post
  updateSignInfo(data_source) {
    this.update_signInfo_url = this.accountSettingsService.updateSignInfo();
    this.update_signInfo_source = this.httpService.myPost(this.update_signInfo_url, JSON.stringify(data_source));
    return this.update_signInfo_source;
  }

  // 拿到市信息 get
  getProvince() {
    this.get_province_url = this.commonService.getProvince();
    this.get_province_source = this.httpService.myGet(this.get_province_url);
    return this.get_province_source;
  }

  // 拿到市信息 get
  getCity(province_id) {
    this.get_city_url = this.commonService.getCity(province_id);
    this.get_city_source = this.httpService.myGet(this.get_city_url);
    return this.get_city_source;
  }

  // 拿到区信息 post
  getDistrict(city_id) {
    this.get_district_url = this.commonService.getDistrict(city_id);
    this.get_district_source = this.httpService.myGet(this.get_district_url);
    return this.get_district_source;
  }

  // 联系人信息更新
  updateContact(data_source) {
    this.update_contact_url = this.accountSettingsService.updateContact();
    this.update_contact_source = this.httpService.myPost(this.update_contact_url, JSON.stringify(data_source));
    return this.update_contact_source;
  }

  // 发送验证码
  getCaptcha(data_source) {
    this.get_captcha_url = this.accountSettingsService.getCaptcha();
    this.get_captcha_source = this.httpService.myPost(this.get_captcha_url, JSON.stringify(data_source));
    return this.get_captcha_source;
  }

  // 更新密码
  updatePw(data_source) {
    this.update_pw_url = this.accountSettingsService.updatePw();
    this.update_pw_source = this.httpService.myPost(this.update_pw_url, JSON.stringify(data_source));
    return this.update_pw_source;
  }

  // 更新手机
  updateMobile(data_source) {
    this.update_mobile_url = this.accountSettingsService.updateMobile();
    this.update_mobile_source = this.httpService.myPost(this.update_mobile_url, JSON.stringify(data_source));
    return this.update_mobile_source;
  }

  // 更新发票信息
  updateFapiao(data_source) {
    this.update_fapiao_url = this.accountSettingsService.updateFapiao();
    return this.httpService.myPost(this.update_fapiao_url, JSON.stringify(data_source));

  }
  deleteSend(id) {
    this.get_send_addr_url = this.accountSettingsService.getSendAddr(id);
    this.get_send_addr_source = this.httpService.myDelete(this.get_send_addr_url);
    return this.get_send_addr_source;
  }

  // 添加邮寄地址
  addSend(data_source) {
    this.add_send_url = this.accountSettingsService.addSend();
    this.add_send_source = this.httpService.myPost(this.add_send_url, JSON.stringify(data_source));

    return this.add_send_source;
  }
  updateSend(id, data_source) {
    this.update_send_url = this.accountSettingsService.updateSend(id);
    this.update_send_source = this.httpService.myPost(this.update_send_url, JSON.stringify(data_source));

    return this.update_send_source;
  }

  // 添加合同公司
  addContractCompany(data_source) {
    this.add_contract_company_url = this.companySeetingsService.addContractCompanies();
    this.add_contract_company_source = this.httpService.myPost(this.add_contract_company_url, JSON.stringify(data_source));
    return this.add_contract_company_source;
  }

  // 获取合同公司列表
  getContractCompany() {
    this.get_contract_company_url = this.companySeetingsService.getContractCompnies();
    this.get_contract_company_source = this.httpService.myGet(this.get_contract_company_url);

    return this.get_contract_company_source;
  }

  // 更新合同公司列表
  updateContractCompany(id, data_source) {
    this.update_contract_company_url = this.companySeetingsService.updateContractCompanies(id);
    this.update_contract_company_source = this.httpService.myPost(this.update_contract_company_url, JSON.stringify(data_source));

    return this.update_contract_company_source;
  }

  // 删除合同公司
  deleteContractCompany(id) {
    this.get_contract_company_url = this.companySeetingsService.getContractCompnies(id);
    this.get_contract_company_source = this.httpService.myDelete(this.get_contract_company_url);

    return this.get_contract_company_source;
  }

  getBenifit() {
    this.get_benifit_url = this.companySeetingsService.getBenifit();
    this.get_benifit_source = this.httpService.myGet(this.get_benifit_url);

    return this.get_benifit_source;
  }

  deleteBenifit(id) {
    this.get_benifit_url = this.companySeetingsService.deleteBenifit(id);
    this.get_benifit_source = this.httpService.myGet(this.get_benifit_url);

    return this.get_benifit_source;
  }


  addBenifit(data_source) {
    this.add_benifit_url = this.companySeetingsService.addBenifit();
    this.add_benifit_source = this.httpService.myPost(this.add_benifit_url, data_source);

    return this.add_benifit_source;
  }

  updateBenifit(data_source) {
    this.update_benifit_url = this.companySeetingsService.updateBenifit();
    this.update_benifit_source = this.httpService.myPost(this.update_benifit_url, data_source);

    return this.update_benifit_source;
  }

  getBenifitItem(id, data_source) {
    this.get_benifit_item_url = this.companySeetingsService.getBenifitItem();

    return this.get_benifit_item_source;
  }

  addOfficeAddr(data_source) {
    this.add_office_addr_url = this.companySeetingsService.addOfficeAddress();
    this.add_office_addr_source = this.httpService.myPost(this.add_office_addr_url, data_source);

    return this.add_office_addr_source;
  }

  getOfficeAddr() {
    this.get_office_addr_url = this.companySeetingsService.getOfficeAddress();
    this.get_office_addr_source = this.httpService.myGet(this.get_office_addr_url);

    return this.get_office_addr_source;
  }

  deleteOfficeAddr(id) {
    this.get_office_addr_url = this.companySeetingsService.getOfficeAddress(id);
    this.get_office_addr_source = this.httpService.myDelete(this.get_office_addr_url);

    return this.get_office_addr_source;
  }

  updateOfficeAddr(id, data_source) {
    this.update_office_addr_url = this.companySeetingsService.updateOfficeAddress(id);
    this.update_office_addr_source = this.httpService.myPost(this.update_office_addr_url, data_source);

    return this.update_office_addr_source;
  }

  getOfficeAddrItem(id, data_source) {
    this.get_office_addr_item_url = this.companySeetingsService.getOfficeAddress();
    this.get_office_addr_item_source = this.httpService.myPost(this.get_office_addr_item_url, data_source);

    return this.get_office_addr_item_source;
  }

  getPositionList() {
    this.get_positionlist_url = this.companySeetingsService.getPositionList();
    this.get_posiitionlist_source = this.httpService.myGet(this.get_positionlist_url);

    return this.get_posiitionlist_source;
  }

  addPosition(data_source) {
    this.add_position_url = this.companySeetingsService.addPosition();
    this.add_position_source = this.httpService.myPost(this.add_position_url, data_source);
    return this.add_position_source;
  }

  updatePosition(id, data_source) {
    this.update_position_url = this.companySeetingsService.updatePosition(id);
    this.update_position_source = this.httpService.myPost(this.update_position_url, data_source);
    return this.update_position_source;
  }

  deletePosition(id) {
    this.get_positionlist_url = this.companySeetingsService.getPositionList(id);
    this.get_posiitionlist_source = this.httpService.myDelete(this.get_positionlist_url);
    return this.get_posiitionlist_source;
  }


  updateYgSelf(data_source) {
    this.update_ygself_url = this.companySeetingsService.updateYgSelf();
    this.update_ygself_source = this.httpService.myPost(this.update_ygself_url, data_source);
    return this.update_ygself_source;
  }

  getYgSelf() {
    this.get_ygself_url = this.companySeetingsService.getYgself();
    this.get_ygself_source = this.httpService.myPost(this.get_ygself_url, {});
    return this.get_ygself_source;
  }

  getSocialRule() {
    this.get_social_rule_url = this.companySeetingsService.getSocialRule();
    this.get_social_rule_source = this.httpService.myGet(this.get_social_rule_url);

    return this.get_social_rule_source;
  }

  getSocialDetail(city_id, rule_id) {
    this.get_social_detail_url = this.companySeetingsService.getSocialDetail(city_id, rule_id);
    this.get_social_detail_source = this.httpService.myGet(this.get_social_detail_url);
    return this.get_social_detail_source;
  }

  getFundDetail(city_id, rule_id) {
    this.get_fund_detail_url = this.companySeetingsService.getFundDetail(city_id, rule_id);
    this.get_fund_detail_rule_source = this.httpService.myGet(this.get_fund_detail_url);
    return this.get_fund_detail_rule_source;
  }


  getFundRule() {
    this.get_fund_rule_url = this.companySeetingsService.getFundRule();
    this.get_fund_rule_source = this.httpService.myGet(this.get_fund_rule_url);
    return this.get_fund_rule_source;
  }

  getSalaryRule() {
    this.get_salary_rule_url = this.companySeetingsService.getSalaryRule();
    this.get_salary_rule_source = this.httpService.myGet(this.get_salary_rule_url);

    return this.get_salary_rule_source;
  }

  getModalSalaryRule() {
    this.get_modal_salary_rule_url = this.companySeetingsService.getModalSalaryRule();
    this.get_modal_salary_rule_source = this.httpService.myGet(this.get_modal_salary_rule_url);
    return this.get_modal_salary_rule_source;
  }

  getModalSalaryBase() {
    this.get_modal_salarybase_rule_url = this.companySeetingsService.getModalSalaryBasic();
    this.get_modal_salarybase_rule_source = this.httpService.myGet(this.get_modal_salarybase_rule_url);
    return this.get_modal_salarybase_rule_source;
  }

  updateSalaryRule(data_source) {
    this.update_salary_rule_url = this.companySeetingsService.updateSalaryRule();
    this.update_salary_rule_source = this.httpService.myPost(this.update_salary_rule_url, data_source);
    return this.update_salary_rule_source;
  }

  updateSalaryBase(data_source) {
    this.update_salarybase_rule_url = this.companySeetingsService.updateSalaryBase();
    this.update_salarybase_rule_source = this.httpService.myPost(this.update_salarybase_rule_url, data_source);
    return this.update_salarybase_rule_source;
  }

  benifitCoverMoney(data_source) {
    this.benifitcover_money_url = this.companySeetingsService.benifitCoverMoney();
    this.benifitcover_money_source = this.httpService.myPost(this.benifitcover_money_url, data_source);
    return this.benifitcover_money_source;
  }

  isBenifitCover(data_source) {
    this.is_benifitcover_url = this.companySeetingsService.isBenifitConver();
    this.is_benifitcover_source = this.httpService.myPost(this.is_benifitcover_url, data_source);
    return this.is_benifitcover_source;
  }
  getQrCode() {
    const qr_code_url = this.accountSettingsService.getQrCode();
    const qr_code_source = this.httpService.myGet(qr_code_url);
    return qr_code_source;
  }

  // <-----


  // // --->获取方法
  // setSalaryCalcSource(data) {
  //   this.salaryCalcSource = this.httpService.myPost(this.salaryApiService.getCalcSalary(), data);
  // }
  //
  // getSalaryCalcEmit() {
  //   return this.salary_calc_emit;
  // }
  //
  // getSalaryCalcSource() {
  //   return this.salaryCalcSource;
  // }
  //
  // emitSalaryCalc() {
  //   this.salary_calc_emit.emit(this.salaryCalcSource);
  // }
  //
  // // <---


  // -->
  // <-----


  // --->获取员工工资方法
  // setStaffSalarySource(data) {
  //   if (JSON.stringify(data) == JSON.stringify({})) {
  //     this.staffSalarySource = this.httpService.myGet(this.salaryApiService.getStaffSalary())
  //       ;
  //   } else {
  //     this.staff_salary_params = new URLSearchParams();
  //     for (let i in data) {
  //       this.staff_salary_params.set(i, data[i]);
  //     }
  //     this.staffSalarySource = this.httpService.myGet(this.salaryApiService.getStaffSalary(), {search: this.staff_salary_params})
  //       ;
  //   }
  // }
  //
  // getStaffSalaryEmit() {
  //   return this.staff_salary_emit;
  // }
  //
  // getStaffSalarySource() {
  //   return this.staffSalarySource;
  // }
  //
  // emitStaffSalary() {
  //   this.staff_salary_emit.emit(this.staffSalarySource);
  // }


}

