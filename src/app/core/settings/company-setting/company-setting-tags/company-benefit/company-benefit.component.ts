import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {CompanySettingsService} from "../../../../../shared/service/api-service/company-settings/company-settings.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-benefit',
  templateUrl: './company-benefit.component.html',
  styleUrls: ['./company-benefit.component.css']
})
export class CompanyBenefitComponent implements OnInit, OnDestroy {
  public modal_name;
  public modal_info;
  public modal_callback;
  public modal_name_emitter;


  public benefit_data;


  constructor(public modalService: ModalService,
              public settingsService: SettingsService,
              public httpService: HttpService,
              public router: Router,
              public companySettingService: CompanySettingsService) {
    this.modal_name_emitter = this.modalService.getModalNameEmit()
        .subscribe(data => {
          this.modal_name = data;
        });
  }

  ngOnInit() {
    this.httpService.myGet(this.companySettingService.getBenifit())
        .subscribe(data => {
          console.log(data);
          this.benefit_data = data.data;
        });
  }

  ngOnDestroy() {
    this.modal_name_emitter.unsubscribe();
  }


  showBenefitSetting(data) {
    this.modal_name = 'benefit_setting';
    this.modal_info = data;
    this.modal_callback = () => {
      this.ngOnInit();
    };
  }
  toBenifitDetail(id) {
    this.router.navigate(['/user/settings/company-setting/benefit-cover', id]);
  }
}
