import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';

@Component({
  selector: 'app-social-setting',
  templateUrl: './social-setting.component.html',
  styleUrls: ['./social-setting.component.css']
})
export class SocialSettingComponent implements OnInit {
  @Input() modal_name;
  @Input() modal_info;
  @Input() modal_callback;
  public shown_data;
  constructor(public modalService: ModalService, public settingService: SettingsService) {

  }


  ngOnInit() {;
    this.settingService.getSocialDetail(this.modal_info.city_id, this.modal_info.rule_id).subscribe((res) => {
      this.shown_data = JSON.parse(JSON.stringify(res.data));
    });

  }
  cancelModal() {
    this.modalService.setModalName('');
    this.modalService.emitModalName();
  }
}
