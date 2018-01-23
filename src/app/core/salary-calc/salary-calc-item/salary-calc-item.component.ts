import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SalaryItemComponent} from "./salary-item/salary-item.component";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {ReduceItemComponent} from "./reduce-item/reduce-item.component";

@Component({
    selector: 'app-salary-calc-item',
    templateUrl: './salary-calc-item.component.html',
    styleUrls: ['./salary-calc-item.component.css'],

})
export class SalaryCalcItemComponent implements OnInit {
    public static bonus_component: SalaryItemComponent;
    public static reduce_component: ReduceItemComponent;
    // -->路由参数
    public inc_id;
    public bonus_router = '';
    public reduce_router = '';
    public type;
    // <-----

    public modal_name_emitter;
    public modal_name;
    public modal_info;
    public modal_callback;

    // -->添加文字
    public add_new_item_txt = {
        1: '新增浮动工资项目',
        2: '新增通用扣减项目'
    };
    // <-----

    constructor(public activatedRoute: ActivatedRoute,
                public modalService: ModalService) {
        this.inc_id = this.activatedRoute.snapshot.params['inc_id'];
        this.bonus_router = `/user/salary-calc/salary-calc-item/${this.inc_id}/bonus`;
        this.reduce_router = `/user/salary-calc/salary-calc-item/${this.inc_id}/reduce`;
        const pathname = window.location.href.split('/');
        this.toggleType();

        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
    }

    clickToggleType() {
        this.toggleType();
    }

    toggleType() {
        setTimeout(() => {
            const pathname = window.location.href.split('/');
            this.type = pathname[pathname.length - 1] === 'bonus' ? 1 : 2;
        });
    }

    addNewItem() {
        console.log(SalaryCalcItemComponent);
        this.modal_name = this.type == 1 ? 'salary_bonus_m' : 'salary_reduce_m';
        this.modal_info = {inc_id: this.inc_id};
        this.type == 1
            ?
            this.modal_callback = () => {
                SalaryCalcItemComponent.bonus_component.requestList();
            }
            :
            this.modal_callback = () => {
                SalaryCalcItemComponent.reduce_component.requestList();
            };
    }
}
