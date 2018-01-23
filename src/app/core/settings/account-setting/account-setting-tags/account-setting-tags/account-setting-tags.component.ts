import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccountSettingsTagsAsyncData} from './account-setting-tags-interface';
import {HttpService} from '../../../../../shared/service/http-service/http.service';
import {AccountSettingsService} from '../../../../../shared/service/api-service/account-settings/account-settings.service';
import {FormControl} from '@angular/forms';
import {Headers} from '@angular/http';
import {SettingsService} from '../../../../../shared/service/settings/settings.service';
import {ModalService} from '../../../../../shared/service/modal/modal.service';

@Component({
  selector: 'app-account-setting-tags',
  templateUrl: './account-setting-tags.component.html',
  styleUrls: ['./account-setting-tags.component.css']
})
export class AccountSettingTagsComponent implements OnInit, OnDestroy {
  public sign_info;
  // public addr;

  // -->modal信息
  public modal_name;
  public modal_info;
  public modal_callback;
  public modal_name_emitter;
  // <-----
  public pic_url;
  public contract = new FormControl(['']);

  constructor(public httpService: HttpService,
              public accountSettingsService: AccountSettingsService,
              public modalService: ModalService,
              public settingsService: SettingsService) {
    this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(
      data => {
        console.log(data);
        this.modal_name = data;
      }
    );
  }

  ngOnInit() {
    this.getSignInfo();
  }

  getSignInfo() {
    this.httpService.myGet(this.accountSettingsService.getUserInfo())
      .subscribe(res => {
        // --> 图片格式处理
        console.log(res);
        const pic_url = {};
        pic_url['license_url'] = res.data.com_sn_url;
        pic_url['contract_front_url'] = res.data.outsource_contract.front_thumbnail;
        pic_url['contract_back_url'] = res.data.outsource_contract.back_thumbnail;
        // <-----
        // -->暂无saas签约
        // const saas_contract = res.data.saas_contract;
        // <-----

        // -->对象合并，接口检查
        this.sign_info = {
          sign_info: res.data.sign_info,
          outsource_contract: res.data.outsource_contract,
          addr: {
            province: res.data.sign_info.province,
            city: res.data.sign_info.city,
            district: res.data.sign_info.district
          },
          pic_url: pic_url
        };
        // <-----
      });
  }

  ngOnDestroy() {
    this.modal_name_emitter.unsubscribe();
  }

  /**
   * openAdjust()
   * 函数描述
   * 打开调整模式
   * @params:
   * @return:
   */
  openAdjust() {
    this.modal_name = 'main_setting';
    this.modal_info = this.sign_info.sign_info;
    this.modal_callback = () => {
      this.ngOnInit();
    };
  }

  // -->
  // <-----


  /**
   * uplodaImg
   * 函数描述
   * 图片上传函数及其子函数
   * @params:
   * @return:
   */
  uploadImg(event: any, func_name, pic_url) {
    // if (event) {
    console.log(func_name, pic_url);
    const form_data = new FormData();
    form_data.append('file', event);
    const header = new Headers();
    header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
    this[`upload${func_name}`](form_data, header, pic_url);
    // }
  }

  uploadLicensePic(data_source, header, pic_url) {
    console.log('aaa');
    this.httpService.myPost(this.accountSettingsService.uploadLicencePic(), data_source, {headers: header}).subscribe((res) => {
      this.sign_info.pic_url[pic_url] = res.data.data.url;
    });
  }

  uploadContractFront(data_source, header, pic_url) {
    this.httpService.myPost(this.accountSettingsService.uploadContractFront(), data_source, {headers: header}).subscribe((res) => {
      this.sign_info.pic_url[pic_url] = res.data.image_1;
      this.getSignInfo();
    });
  }

  uploadContractBack(data_source, header, pic_url) {
    this.httpService.myPost(this.accountSettingsService.uploadContractBack(), data_source, {headers: header}).subscribe((res) => {
      this.sign_info.pic_url[pic_url] = res.data.url;
      this.getSignInfo();
    });
  }

  uploadSaasFront(data_source, header, pic_url) {
    this.httpService.myPost(this.accountSettingsService.uploadSaasFront(), data_source, {headers: header}).subscribe((res) => {
      this.sign_info.pic_url[pic_url] = res.data.url;
      this.getSignInfo();
    });
  }

  uploadSaasBack(data_source, header, pic_url) {
    this.httpService.myPost(this.accountSettingsService.uploadSaasBack(), data_source, {headers: header}).subscribe((res) => {
      this.sign_info.pic_url[pic_url] = res.data.url;
      this.getSignInfo();
    });
  }
  downloadContract(type) {
    console.log(this.sign_info.outsource_contract, `${type}_preview`);
    console.log(this.sign_info.outsource_contract[`${type}_preview`]);
    window.open(`${this.sign_info.outsource_contract[`${type}_preview`]}?&token=${window.localStorage.getItem('mayihr_token')}`);
  }
  // -->
  // <-----

}
