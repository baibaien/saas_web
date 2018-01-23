import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssistHomeComponent} from './assist-home/assist-home.component';
import {AssistCenterRoutingModule} from "./assist-center-routing.module";

import {BaseModule} from "../../base.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {PipeModule} from "../../shared/pipe/pipe.module";
import {AssistMsgDetailMModule} from "../../modal/assist-center/assist-msg-detail-m/assist-msg-detail-m.module";
import {MayihrPagingV2Module} from "../../common/mayihr-paging-v2/mayihr-paging-v2.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        AssistCenterRoutingModule,
        MayihrPagingModule,
        PipeModule,
        AssistMsgDetailMModule,
        MayihrPagingV2Module
    ],
    declarations: [AssistHomeComponent]
})
export class AssistCenterModule {
}
