import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from "../../base.module";
import {SalaryOutsourcingRoutingModule} from "./salary-outsourcing-routing.module";
import {SalaryOutsourcingComponent} from "./salary-outsourcing.component";
import {SalaryOutsourcingModalComponent} from './salary-outsourcing-modal/salary-outsourcing-modal.component';
import {BatchOperateResultComponent} from "./salary-outsourcing-modal/batch-operate-result/batch-operate-result.component";
import {BillFiledMComponent} from "./salary-outsourcing-modal/bill-filed-m/bill-filed-m.component";
import {SalarySupportComponent} from "./salary-outsourcing-modal/salary-support/salary-support.component";
import {SocialAssuranceReduceMComponent} from "./salary-outsourcing-modal/social-assurance-reduce-m/social-assurance-reduce-m.component";
import {AssistModalModule} from "../../assist-modal/assist-modal.module";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {MayihrSearchingModule} from "../../common/mayihr-searching/mayihr-searching.module";
import {MayihrFilterStatusModule} from "../../common/mayihr-filter-status/mayihr-filter-status.module";
import {MayihrFilterModule} from "../../common/mayihr-filter/mayihr-filter.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {PipeModule} from "../../shared/pipe/pipe.module";
import {CommercialInsuranceEditMModule} from "../../modal/commercial-insurance/commercial-insurace-edit/commercial-insurance-edit.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SalaryOutsourcingRoutingModule,
        AssistModalModule,
        MayihrTagsModule,
        MayihrSearchingModule,
        MayihrFilterStatusModule,
        MayihrFilterModule,
        MayihrPagingModule,
        PipeModule,
        CommercialInsuranceEditMModule
    ],
    declarations: [
        SalaryOutsourcingComponent,
        SalaryOutsourcingModalComponent,
        BatchOperateResultComponent,
        BillFiledMComponent,
        SalarySupportComponent,
        SocialAssuranceReduceMComponent
    ]
})
export class SalaryOutsourcingModule {
}
