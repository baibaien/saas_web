import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {StaffsService} from "../../api-service/staff-directory/staffs/staffs.service";
import {Http} from "@angular/http";
import {SocialBaseService} from "../../api-service/staff-directory/social-base/social-base.service";
import {ModalService} from "../../modal/modal.service";
import {HttpService} from "../../http-service/http.service";
@Injectable()
export class StaffDetailService {
  // get request
  public staffDetail: Observable<any>;
  public staff_detail_url: string;
  // public staff_info: object;
  public user_id;
  public qulified_url: string;
  public staff_setting_url;
  public staff_setting_source;
  public staff_work_edit_url;
  public staff_work_edit_source;
  public staff_work_add_url;
  public staff_work_add_source;
  public staff_work_url;
  public staff_work_source;
  public upload_pic_url;
  public upload_pic_source;
  public delete_pic_url;
  public delete_pic_source;
  public staff_education_edit_url; // 编辑
  public staff_education_edit_source;
  public staff_education_add_url; // 添加
  public staff_education_add_source;
  public staff_education_url; // 查看删除
  public staff_education_source;

  public staff_family_edit_url;
  public staff_family_edit_source;
  public staff_family_add_url;
  public staff_family_add_source;
  public staff_family_url;
  public staff_family_source;

  public staff_contractlist_url;
  public staff_contractlist_source;
  public staff_addcontract_url;
  public staff_addcontract_source;
  public staff_updatebase_url;
  public staff_updatebase_source;
  public staff_qualified_url;
  public staff_qualified_source;
  public staff_updatecontact_url;
  public staff_updatecontact_source;
  public staff_updatepay_url;
  public staff_updatepay_source;
  public staff_updatebenifit_url;
  public staff_updatebenifit_source;
  public staff_updatesocial_url;
  public staff_updatesocial_source;
  public staff_update_accout_url;
  public staff_update_accout_source;
  public staff_updatehospital_url;
  public staff_updatehospital_source;
  public staff_gethospital_url;
  public staff_gethospital_source;
  public staff_getbank_url;
  public staff_getbank_source;
  public staff_getopenbank_url;
  public staff_getopenbank_source;
  public get_hospital_info_url;
  public get_hospital_info_source;
  public get_social_state_url;
  public get_social_state_source;
  // public staff_contractlist_url;
  // public social_city_source;
  // public social_city_url;
  // public social_city_requestion: RequestOptions = new RequestOptions();

  constructor(public staffsService: StaffsService,
              public httpService: HttpService,
              public socialBaseService: SocialBaseService,
              public  modalService: ModalService) {
    this.staff_setting_url = this.staffsService.getYgSettings();

    this.staff_work_add_url = this.staffsService.addYgWork();

    this.staff_education_add_url = this.staffsService.addYgEducation();

    this.staff_family_add_url = this.staffsService.addYgFamily();

  }

  setRequest(data) {
    this.user_id = data;
    this.staff_detail_url = this.staffsService.getStaff(this.user_id);
    this.staffDetail = this.httpService.myGet(this.staff_detail_url);
  }

  getRequest(): Observable<any> {
    return this.staffDetail;
  }

  // setInfo(data) {
  //   this.staff_info = data;
  // }

  // 员工基本信息
  // getInfo() {
  //   return this.staff_info;
  // }

  // 页面基本配置
  setStaffSetting() {
    this.staff_setting_source = this.httpService.myGet(this.staff_setting_url);
    return this.staff_setting_source;
  }
  updateYgAccountMsg(yg_id, data_source) {
    this.staff_update_accout_url = this.staffsService.updateYgAccount();
    this.staff_update_accout_source = this.httpService.myPost(this.staff_update_accout_url, data_source);
    return this.staff_update_accout_source;
  }
  // addSocialCity(): Observable<any> {
  //   this.social_city_source = this.httpService.myGet(this.social_city_url, this.social_city_requestion).map((res) => {
  //     return res.json();
  //   });
  //   return this.social_city_source;
  // }
  getWork(id): Observable<any> {
    this.staff_work_url = this.staffsService.getYgWork(id);
    this.staff_work_source = this.httpService.myGet(this.staff_work_url);
    return this.staff_work_source;
  }

  deleteWork(id): Observable<any> {
    this.staff_work_url = this.staffsService.getYgWork(id);
    this.staff_work_source = this.httpService.myDelete(this.staff_work_url);
    return this.staff_work_source;
  }

  addWork(data_source): Observable<any> {
    this.staff_work_add_source = this.httpService.myPost(this.staff_work_add_url, data_source);
    return this.staff_work_add_source;
  }

  updateWork(id, data_source): Observable<any> {
    this.staff_work_edit_url = this.staffsService.updateYgWork(id);
    this.staff_work_edit_source = this.httpService.myPost(this.staff_work_edit_url, data_source);
    return this.staff_work_edit_source;
  }

  getEducation(id): Observable<any> {
    this.staff_education_url = this.staffsService.getYgEducation(id);
    this.staff_education_source = this.httpService.myGet(this.staff_education_url);
    return this.staff_education_source;
  }

  deleteEducation(id): Observable<any> {
    this.staff_education_url = this.staffsService.getYgEducation(id);
    this.staff_education_source = this.httpService.myDelete(this.staff_education_url);
    return this.staff_education_source;
  }

  addEducation(data_source): Observable<any> {
    this.staff_education_add_source = this.httpService.myPost(this.staff_education_add_url, data_source);
    return this.staff_education_add_source;
  }

  updateEducation(id, data_source): Observable<any> {
    this.staff_education_edit_url = this.staffsService.updateYgEducation(id);
    console.log(this.staff_education_edit_url);
    this.staff_education_edit_source = this.httpService.myPost(this.staff_education_edit_url, data_source);
    return this.staff_education_edit_source;
  }

  getFamily(id): Observable<any> {
    this.staff_family_url = this.staffsService.getYgFamily(id);
    this.staff_family_source = this.httpService.myGet(this.staff_family_url);
    return this.staff_family_source;
  }

  deleteFamily(id): Observable<any> {
    this.staff_family_url = this.staffsService.getYgFamily(id);
    this.staff_family_source = this.httpService.myDelete(this.staff_family_url);
    return this.staff_family_source;
  }

  addFamily(data_source): Observable<any> {
    this.staff_family_add_source = this.httpService.myPost(this.staff_family_add_url, data_source);
    return this.staff_family_add_source;
  }

  updateFamily(id, data_source): Observable<any> {
    this.staff_family_edit_url = this.staffsService.updateYgFamily(id);
    this.staff_family_edit_source = this.httpService.myPost(this.staff_family_edit_url, data_source);
    return this.staff_family_edit_source;
  }

  getContractList(yg_id): Observable<any> {
    this.staff_contractlist_url = this.staffsService.getContractList(yg_id);
    this.staff_contractlist_source = this.httpService.myGet(this.staff_contractlist_url);
    return this.staff_contractlist_source;
  }

  addContract(data_source): Observable<any> {
    this.staff_addcontract_url = this.staffsService.addContract();
    this.staff_addcontract_source = this.httpService.myPost(this.staff_addcontract_url, data_source);
    return this.staff_addcontract_source;
  }
  downloadContract() {
    const contract_url = this.staffsService.downloadContract();
    const contract_source = this.httpService.myPost(contract_url, {});
    return contract_source;
  }

  updateYgBaseMsg(yg_id, data_source): Observable<any> {
    this.staff_updatebase_url = this.staffsService.updateYgBase(yg_id);
    this.staff_updatebase_source = this.httpService.myPost(this.staff_updatebase_url, data_source);
    return this.staff_updatebase_source;
  }

  updateYgContactMsg(yg_id, data_source): Observable<any> {
    this.staff_updatecontact_url = this.staffsService.updateYgContact(yg_id);
    this.staff_updatecontact_source = this.httpService.myPost(this.staff_updatecontact_url, data_source);
    return this.staff_updatecontact_source;
  }

  // 转正
  getYgQualified(data_source): Observable<any> {
    this.staff_qualified_url = this.staffsService.getYgQualified();
    this.staff_qualified_source = this.httpService.myPost(this.staff_qualified_url, data_source);
    return this.staff_qualified_source;
  }

// 调整薪酬
  updateYgPayMsg(yg_id, data_source): Observable<any> {
    this.staff_updatepay_url = this.staffsService.getYgPay();
    this.staff_updatecontact_source = this.httpService.myPost(this.staff_updatepay_url, data_source);
    return this.staff_updatecontact_source;
  }

// 调整福利
  updateYgBenifitMsg(yg_id, data_source): Observable<any> {
    this.staff_updatebenifit_url = this.staffsService.getYgBenifit();
    this.staff_updatebenifit_source = this.httpService.myPost(this.staff_updatebenifit_url, data_source);
    return this.staff_updatebenifit_source;
  }

  // 调整社保
  updateYgSocialMsg(yg_id, data_source): Observable<any> {
    this.staff_updatesocial_url = this.staffsService.getYgSocial();
    this.staff_updatesocial_source = this.httpService.myPost(this.staff_updatesocial_url, data_source);
    return this.staff_updatesocial_source;
  }
  getHospitalInfo(data_source): Observable<any> {
    this.get_hospital_info_url = this.staffsService.getHospital();
    this.get_hospital_info_source = this.httpService.myPost(this.get_hospital_info_url, data_source);
    return this.get_hospital_info_source;
  }
  updateYgHospitalMsg(data_source): Observable<any> {
    this.staff_updatehospital_url = this.staffsService.updateYgHospital();
    this.staff_updatehospital_source = this.httpService.myPost(this.staff_updatehospital_url, data_source);
    return this.staff_updatehospital_source;
  }

  getYgHospitalMsg(data_source): Observable<any> {
    console.log('hospital', data_source);
    this.staff_gethospital_url = this.staffsService.getYgHospital();
    this.staff_gethospital_source = this.httpService.myPost(this.staff_gethospital_url, data_source);
    return this.staff_gethospital_source;
  }

  getYgBankMsg(data_source): Observable<any> {
    this.staff_getbank_url = this.staffsService.getYgBank();
    this.staff_getbank_source = this.httpService.myPost(this.staff_getbank_url, data_source);
    return this.staff_getbank_source;
  }

  getYgOpenbankMsg(data_source): Observable<any> {
    this.staff_getopenbank_url = this.staffsService.getYgOpenBank();
    this.staff_getopenbank_source = this.httpService.myPost(this.staff_getopenbank_url, data_source);
    return this.staff_getopenbank_source;
  }
  uploadYgPic(data_source): Observable<any> {
    this.upload_pic_url = this.staffsService.uploadYgPics();
    this.upload_pic_source = this.httpService.myPost(this.upload_pic_url, data_source);
    return this.upload_pic_source;
  }
  deleteYgPic(data_source): Observable<any> {
    this.delete_pic_url = `${this.staffsService.deleteYgpic()}/${data_source}`;
    this.delete_pic_source = this.httpService.myDelete(this.delete_pic_url);
    return this.delete_pic_source;
  }
  getSocialState(yg_id): Observable<any> {
    this.get_social_state_url = this.staffsService.getSocialState(yg_id);
    this.get_social_state_source = this.httpService.myGet(this.get_social_state_url);
    return this.get_social_state_source;
  }
}
