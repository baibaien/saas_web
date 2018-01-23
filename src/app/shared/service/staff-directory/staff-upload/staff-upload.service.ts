import {Injectable} from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {StaffsService} from "../../api-service/staff-directory/staffs/staffs.service";
import {SocialBaseService} from "../../api-service/staff-directory/social-base/social-base.service";
import {StaffWorksService} from "../../api-service/staff-directory/staff-works/staff-works.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class StaffUploadService {
// public dataSource: Observable<any>;
  public upload_source: Observable<any>;
  public upload_url: string;
  public staff_source: Observable<any>;
  public staff_setting_url: string;
  public social_city_source: Observable<any>;
  public social_city_url: string;
  public social_setting_source: Observable<any>;
  public social_setting_url: string;
  public social_range_source: Observable<any>;
  public social_range_url: string;
  public social_rule_source: Observable<any>;
  public social_rule_url: string;
  public add_position_source: Observable<any>;
  public add_position_url: string;
  public search_position_source: Observable<any>;
  public search_position_url: string;
  public get_city_fund_source: Observable<any>;
  public get_city_fund_url: string;
  public get_city_social_source: Observable<any>;
  public get_city_social_url: string;
  public saveYgsExcel_url: string;
  public saveYgsExcel_source: Observable<any>;
  public gaveup_excel_url: string;
  public gaveup_excel_source: Observable<any>;
  public rehire_url: string;
  public rehire_source;


  constructor(public  http: Http,
              public httpService: HttpService,
              public staffsService: StaffsService,
              public socialBaseService: SocialBaseService,
              public staffWorksService: StaffWorksService) {
    this.staff_setting_url = this.staffsService.getYgSettings();
    this.upload_url = this.staffsService.getYgUpload();
    this.rehire_url = this.staffsService.rehire();
    this.social_city_url = this.socialBaseService.getSocialCity();

  }

  addStaffSettings(): Observable<any> {
    this.staff_source = this.httpService.myGet(this.staff_setting_url);
    return this.staff_source;
  };

  addStaff(dataSource): Observable<any> {
    this.upload_source = this.httpService.myPost(this.upload_url, dataSource);
    return this.upload_source;
  };

  rehireStaff(dataSource): Observable<any> {
    this.rehire_source = this.httpService.myPost(this.rehire_url, dataSource);
    return this.rehire_source;
  };

  addSocialCity(): Observable<any> {
    this.social_city_source = this.httpService.myGet(this.social_city_url);
    return this.social_city_source;
  }

  addSocialSetting(city_id): Observable<any> {
    this.social_setting_url = this.socialBaseService.getSocialBase(city_id);
    this.social_setting_source = this.httpService.myGet(this.social_setting_url);
    return this.social_setting_source;
  }

  addSocialRange(city_id): Observable<any> {
    this.social_range_url = this.socialBaseService.getSocialRange(city_id);
    this.social_range_source = this.httpService.myGet(this.social_range_url);
    return this.social_range_source;
  }

  addSocialRule(city_id, hk_type): Observable<any> {
    this.social_rule_url = this.socialBaseService.getSocialRule(city_id, hk_type);
    this.social_rule_source = this.httpService.myGet(this.social_rule_url);
    return this.social_rule_source;
  }
  getCitySocial(city_id, social_rule) {
    this.get_city_social_url = this.socialBaseService.getCitySocial(city_id, social_rule);
    this.get_city_social_source = this.httpService.myGet(this.get_city_social_url);
    return this.get_city_social_source;
  }
  getCityFund(city_id, fund_rule) {
    this.get_city_fund_url = this.socialBaseService.getCityFund(city_id, fund_rule);
    this.get_city_fund_source = this.httpService.myGet(this.get_city_fund_url);
    return this.get_city_fund_source;
  }
  addPosition(dataSource): Observable<any> {
    this.add_position_url = this.staffWorksService.getAddStaffWork();
    this.add_position_source = this.httpService.myPost(this.add_position_url, dataSource);
    return this.add_position_source;
  }

  searchPosition(name = ''): Observable<any> {
    this.search_position_url = this.staffWorksService.getStaffWorkList();
    this.search_position_source = this.httpService.myGet(`${this.search_position_url}${name}&is_all_display=1`);
    return this.search_position_source;
  }
  saveYgsExcel(): Observable<any> {
    this.saveYgsExcel_url = this.staffsService.saveYgsExcel();
    this.saveYgsExcel_source = this.httpService.myPost(`${this.saveYgsExcel_url}`, {});
    return this.saveYgsExcel_source;
  }
  gaveupExcel(): Observable<any> {
    this.gaveup_excel_url = this.staffsService.gaveupExcel();
    this.gaveup_excel_source = this.httpService.myPost(`${this.gaveup_excel_url}`, {});
    return this.gaveup_excel_source;
  }
}
