/**
 * Created by Bonan on 2017/11/7.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PipeModule} from "../../../shared/pipe/pipe.module";
import {BillTableComponent} from './bill-table.component';
import {BillDetailMModule} from "../../../modal/bill-et-invoice/bill-detail/bill-detail-m.module";
@NgModule({
    imports: [
        CommonModule,
        PipeModule,
        BillDetailMModule
    ],
    declarations: [BillTableComponent],
    exports: [BillTableComponent]
})
export class BillTableModule {

}