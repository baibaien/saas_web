import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-bill-table',
    templateUrl: './bill-table.component.html',
    styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit, OnDestroy {
    @Input()
    table_data;
    // -->
    public bill_table_header = [
        {column_key: 'bill_name', column_name: '账单', column: 'bill_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'city_name', column_name: '城市', column: 'city_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'create_time', column_name: '账单生成时间', column: 'create_time', filter: 0, selected: false, adjust: -1},
        {column_key: 'num', column_name: '人数', column: 'num', filter: 0, selected: false, adjust: 1},
        {column_key: 'money ', column_name: '金额', column: 'money', filter: 0, selected: false, adjust: 1}
    ];
    // <-----

    // -->
    public modal_name;
    public modal_info;
    public modal_name_emitter;
    // <-----
    constructor(public modalService: ModalService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                console.log(data);
                this.modal_name = data;
            });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    openBillDetail(event, bill) {
        event.stopPropagation();
        if (bill.is_mingxi == 1) {
            this.modal_name = 'bill_detail_m';
            this.modal_info = bill.id;
        }
    }
}
