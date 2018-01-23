/**
 * Created by Bonan on 2017/11/9.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BillDealStatusComponent} from "./bill-deal-status.component";
import {BillDealStatusRoutingModule} from "./bill-deal-status-routing.module";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {BaseModule} from "../../base.module";
import {PipeModule} from "../../shared/pipe/pipe.module";
@NgModule({
    imports: [
        CommonModule,
        // BaseModule,
        BillDealStatusRoutingModule,
        MayihrTagsModule,
        PipeModule
    ],
    declarations: [
        BillDealStatusComponent
    ],
    exports: [
        BillDealStatusComponent
    ]
})
export class BillDealStatusModule {
}