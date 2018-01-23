import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../base.module";
import {AssistModalModule} from "../../assist-modal/assist-modal.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {MayihrSearchingModule} from "../../common/mayihr-searching/mayihr-searching.module";
import {SalaryEditRemarkMModule} from "../../modal/salary-calc/salary-remark-m/salary-remark-m.module";
import {SalaryBonusMModule} from "../../modal/salary-calc/salary-item-m/salary-item-m.module";
import {ReduceItemMModule} from "../../modal/salary-calc/reduce-item-m/reduce-item-m.module";
import {SalaryHistoryComponent} from "./salary-history/salary-history.component";
import {SalaryHistoryDetailComponent} from "./salary-history-detail/salary-history-detail.component";
import {SalaryCalcHistoryRoutingModule} from "./salary-calc-history-routing.module";
import {AttendanceAdjustMModule} from "../../modal/salary-calc/attendance-adjust-m/attendance-adjust-m.module";
import {BonusAdjustMModule} from "../../modal/salary-calc/bonus-adjust-m/bonu-adjust-m.module";
import {ReduceAdjustMModule} from "../../modal/salary-calc/reduce-adjust-m/reduce-adjust-m.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        AssistModalModule,
        MayihrPagingModule,
        MayihrTagsModule,
        MayihrSearchingModule,
        SalaryEditRemarkMModule,
        SalaryBonusMModule,
        ReduceItemMModule,
        SalaryCalcHistoryRoutingModule,
        AttendanceAdjustMModule,
        BonusAdjustMModule,
        ReduceAdjustMModule
    ],
    declarations: [
        SalaryHistoryComponent,
        SalaryHistoryDetailComponent,
    ]
})
export class SalaryCalcHistoryModule {
}
