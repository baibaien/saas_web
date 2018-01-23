import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {requireDeci} from '../../../../shared/validators/staff-upload-validator';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
  selector: 'app-benefit-money',
  templateUrl: './benefit-money.component.html',
  styleUrls: ['./benefit-money.component.css']
})
export class BenefitMoneyComponent implements OnInit {

  @Input() modal_name;
  @Input() modal_info;
  @Input() modal_callback;

  public before_submit = true;
  public benifit_money: FormControl;
  public contract_id = -1;


  constructor(fb: FormBuilder,
              public modalService: ModalService,
              public settingsService: SettingsService,
              public assistModalService: AssistModalService) {
    this.benifit_money = fb.control('', [Validators.required, requireDeci]);
  }

  ngOnInit() {
    console.log(this.modal_info);
    this.benifit_money.setValue(this.modal_info.money);
  }

  cancelModal() {
    this.benifit_money.reset('');
    this.modalService.setModalName('');
    this.modalService.emitModalName();
  }

  saveMsg() {
    this.before_submit = false;

    if (this.benifit_money.valid) {
      const submit_data = {
        staff: `${this.modal_info.staff}`,
        id: `${this.modal_info.id}`,
        money: this.benifit_money.value
      };
      submit_data['money'] = this.benifit_money.value;
      this.settingsService.benifitCoverMoney(submit_data).subscribe((res) => {
        this.assistModalService.openAssistModal('toast', '保存成功', () => {
          this.modalService.setModalName('');
          this.modalService.emitModalName();
          this.modal_callback();
        })
      });
    }
  }
}
