import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
  selector: 'app-saas-index-price',
  templateUrl: './saas-index-price.component.html',
  styleUrls: ['./saas-index-price.component.css', '../index-main.less']
})
export class SaasIndexPriceComponent implements OnInit {


  public price;
  public price_watcher;
  public customer_money;
  public total_price = 0;

  constructor(public fb: FormBuilder,
              public assistModalService: AssistModalService) {
    this.price = fb.group({
      user_type: ['100'],
      social: ['20'],
      salary: [false],
      num: ['']
    });

    this.price_watcher = this.price.valueChanges.subscribe((data) => {
      const sa = data.salary ? 10 : 0;
      const so = data.social ? 20 : 0;
      this.customer_money = sa + so;
      if (!this.customer_money) {
        this.price.get('social').setValue('20');
        this.assistModalService.openAssistModal('toast', '至少选择一项服务', () => {
        });
      }
    });
  };

  ngOnInit() {
    this.customer_money = 20;
  }

  calcMoney(num, con_money, cos_money) {
    console.log(num, con_money, cos_money);
    if  (!Number.isInteger(Number(num))){
      alert('请输入整数！');
    }else if (Number(num) > 100) {
      alert('人数超过100请联系销售！');
    }else if (Number(num) < 1) {
      alert('人数不能小于1！');
    }else {
      this.total_price =  Number(num) * Number(cos_money) + Number(con_money);
    }
  }
}
