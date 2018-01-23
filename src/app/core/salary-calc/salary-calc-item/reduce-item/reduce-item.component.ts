import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {ActivatedRoute} from "@angular/router";
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {SalaryApiService} from "../../../../shared/service/api-service/salary-api/salary-api.service";
import {SalaryCalcItemComponent} from "../salary-calc-item.component";

@Component({
    selector: 'app-reduce-item',
    templateUrl: './reduce-item.component.html',
    styleUrls: ['./reduce-item.component.css'],

})
export class ReduceItemComponent implements OnInit, OnDestroy {
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
        SalaryCalcItemComponent.reduce_component = this;
        const url_tmp = window.location.href.split('/');
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
            this.modal_name = 'salary_reduce_m';
            this.modal_info = data.data.data;
            this.modal_info['inc_id'] = item.inc_id;
            this.modal_callback = () => {
                this.requestList();
            };
        });
    }
}
