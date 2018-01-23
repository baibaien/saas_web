import {Component, Input, OnInit, ViewEncapsulation, OnChanges, OnDestroy} from '@angular/core';
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {SalaryApiService} from "../../../../shared/service/api-service/salary-api/salary-api.service";
import {ActivatedRoute} from "@angular/router";
import {SalaryCalcItemComponent} from "../salary-calc-item.component";
import {ModalService} from "../../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-salary-item',
    templateUrl: './salary-item.component.html',
    styleUrls: ['./salary-item.component.css'],

})
export class SalaryItemComponent implements OnInit, OnDestroy {
    public inc_id;
    public type;

    // -->子组件引用


    public modal_name;
    public modal_name_emitter;
    public modal_info;
    public modal_callback;
    // <-----

    // -->表头
    public table_header = [
        {column_key: 'number', column_name: '序号', column: 'number', filter: 0, selected: false, adjust: -1},
        {column_key: 'name', column_name: '项目名称', column: 'name', filter: 0, selected: false, adjust: -1},
        {column_key: 'type', column_name: '类型', column: 'type', filter: 0, selected: false, adjust: -1},
        {column_key: 'future', column_name: '是否在未来工资表中使用', column: 'future', filter: 0, selected: false, adjust: -1}
    ];
    // <-----
    // -->数据列表
    public item_list = [];
    // <-----

    constructor(public httpService: HttpService,
                public activatedRoute: ActivatedRoute,
                public modalService: ModalService,
                public salaryApiService: SalaryApiService) {
        SalaryCalcItemComponent.bonus_component = this;
        const url_tmp = window.location.href.split('/');
        console.log(url_tmp);
        this.inc_id = url_tmp[url_tmp.length - 2];
        this.type = url_tmp[url_tmp.length - 1] === 'bonus' ? 1 : 2;

        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        this.requestList();
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    requestList() {
        this.httpService.myGet(this.salaryApiService.getSalaryCalcItem(this.inc_id, this.type), {})
            .subscribe(data => {
                console.log(data);
                this.item_list = data.data;
            });
    }

    editBonus(item) {
        console.log(item);
        this.httpService.myGet(this.salaryApiService.getAttendanceChangeItem(), {
            search: {
                id: item.id,
                inc_id: item.inc_id
            }
        }).subscribe((data) => {
            this.modal_name = 'salary_bonus_m';
            this.modal_info = data.data.data;
            this.modal_info['inc_id'] = item.inc_id;
            this.modal_callback = () => {
                this.requestList();
            };
        });
    }
}
