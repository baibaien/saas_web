/**
 * Created by Bonan on 2017/11/7.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BillDetailMComponent} from "./bill-detail-m.component";
import {PipeModule} from "../../../shared/pipe/pipe.module";
@NgModule({
    imports: [
        CommonModule,
        PipeModule,
    ],
    declarations: [
        BillDetailMComponent
    ],
    exports: [
        BillDetailMComponent
    ]
})
export class BillDetailMModule {

}