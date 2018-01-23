import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-invoice-manage',
    templateUrl: './invoice-manage.component.html',
    styleUrls: ['./invoice-manage.component.css']
})
export class InvoiceManageComponent implements OnInit {
    public tags = [
        {name: '未开票订单', current: true, id: 'un_out'},
        {name: '待出票订单', current: false, id: 'wait_out'},
        {name: '已开票订单', current: false, id: 'out_order'}
    ];
    constructor() {
    }

    ngOnInit() {
    }

}
