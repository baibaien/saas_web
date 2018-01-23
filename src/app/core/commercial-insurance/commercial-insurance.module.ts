import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommercialInsuranceRoutingModule} from "./commercial-insurance-routing.module";
import {CommercialInsuranceComponent, SupTypeToNumPipe} from "./commercial-insurance/commercial-insurance.component";
import {BaseModule} from "../../base.module";
import {AssistModalModule} from "../../assist-modal/assist-modal.module";
import {MayihrSearchingModule} from "../../common/mayihr-searching/mayihr-searching.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {MayihrFilterModule} from "../../common/mayihr-filter/mayihr-filter.module";
import {MayihrFilterStatusModule} from "../../common/mayihr-filter-status/mayihr-filter-status.module";
import { CommercialDetailComponent } from './commercial-detail/commercial-detail.component';
import {CommercialInsuranceEditMModule} from "../../modal/commercial-insurance/commercial-insurace-edit/commercial-insurance-edit.module";

@NgModule({
    imports: [
        CommonModule,
        CommercialInsuranceRoutingModule,
        BaseModule,
        AssistModalModule,
        MayihrSearchingModule,
        MayihrPagingModule,
        MayihrFilterModule,
        MayihrFilterStatusModule,
        CommercialInsuranceEditMModule
    ],
    declarations: [
        SupTypeToNumPipe,
        CommercialInsuranceComponent,
        CommercialDetailComponent

    ]
})
export class CommercialInsuranceModule {
}
