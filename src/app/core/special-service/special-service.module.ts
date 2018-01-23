import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpecialServiceComponent} from "./special-service/special-service.component";
import {SpecialServicePaidComponent} from "./special-service-paid/special-service-paid.component";
import {MyServiceDetailComponent} from "./my-service-detail/my-service-detail.component";
import {BaseModule} from "../../base.module";
import {SpecialServiceRoutingModule} from "./special-service-routing.module";
import {SpecialServiceModalComponent} from './special-service-modal/special-service-modal.component';
import {StaffServiceComponent} from "./special-service-modal/staff-service/staff-service.component";
import {DetailInfoComponent} from "./special-service-modal/detail-info/detail-info.component";
import {AssistModalModule} from "../../assist-modal/assist-modal.module";
// import {SelectModule} from "ng2-select";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {MayihrSelectModule} from "../../common/mayihr-select/mayihr-select.module";
import {SendSettingMModule} from "../../modal/settings/account-settings/send-setting-m/send-setting-m.module";
import {PipeModule} from "../../shared/pipe/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SpecialServiceRoutingModule,
        AssistModalModule,
        // SelectModule,
        MayihrTagsModule,
        MayihrPagingModule,
        MayihrSelectModule,
        SendSettingMModule,
        PipeModule
    ],
    declarations: [
        SpecialServiceComponent,
        SpecialServicePaidComponent,
        MyServiceDetailComponent,
        SpecialServiceModalComponent,
        StaffServiceComponent,
        DetailInfoComponent
    ]
})
export class SpecialServiceModule {
}
