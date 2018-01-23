import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../shared/service/http-service/http.service";
import {BillManageApiService} from "../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {BillManageService} from "../../shared/service/bill-manage/bill-manage.service";

@Component({
    selector: 'app-bill-manage-box',
    templateUrl: './bill-manage-box.component.html',
    styleUrls: ['./bill-manage-box.component.css']
})
export class BillManageBoxComponent implements OnInit, OnDestroy {
    public count_emitter = new EventEmitter();
    public count;
    constructor(public httpService: HttpService,
                public billManageService: BillManageService,
                public billManageApiService: BillManageApiService) {
        this.billManageService.setCountEmitter(this.count_emitter);
        this.count_emitter.subscribe(data => {
            this.httpService.myGet(this.billManageApiService.getUnpaidTotal())
                .subscribe(data1 => {
                console.log(data1);
                this.count = data1.data.total;
                });
        });
    }

    ngOnInit() {
        this.count_emitter.emit();
    }

    ngOnDestroy() {
        this.count_emitter.unsubscribe();
    }

}
