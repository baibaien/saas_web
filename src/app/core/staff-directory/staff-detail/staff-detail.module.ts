import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractListComponent} from './modal/contract-list/contract-list.component';
import {LabourContractComponent} from './modal/labour-contract/labour-contract.component';
import {StaffDeletFormComponent} from './modal/staff-delet-form/staff-delet-form.component';
import {StaffQualifiedComponent} from './modal/staff-qualified/staff-qualified.component';
import {ModalComponent} from './modal/modal.component';
import {StaffDetailComponent} from './staff-detail/staff-detail.component';
import {BaseModule} from '../../../base.module';
import {StaffDetailRoutingModule} from './staff-detail-routing.module';
import {AssistModalModule} from '../../../assist-modal/assist-modal.module';
import {DirectiveModule} from '../../../shared/directive/directive.module';
import {MayihrDatepickerModule} from '../../../common/mayihr-datepicker/mayihr-datepicker.module';
import {MayihrSelectModule} from '../../../common/mayihr-select/mayihr-select.module';
import {StaffSaleMModule} from '../../../modal/staff-detail/staff-detail/staff-self-m/staff-self-m.module';
import {StaffHosiptalMModule} from "../../../modal/staff-detail/staff-detail/staff-hospital-m/staff-hospital-m.module";
import {MayihrImgUploadModule} from "../../../common/mayihr-img-upload/mayihr-img-upload.module";
import {CreateAbsenceMModule} from "../../../modal/staff-attendance/create-absence/create-absence-m.module";
import {CreateOvertimeMModule} from "../../../modal/staff-attendance/create-overtime/create-overtime.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        StaffDetailRoutingModule,
        AssistModalModule,
        DirectiveModule,
        MayihrDatepickerModule,
        MayihrSelectModule,
        MayihrImgUploadModule,
        StaffSaleMModule,
        StaffHosiptalMModule,
        CreateAbsenceMModule,
        CreateOvertimeMModule
    ],
    declarations: [
        ContractListComponent,
        LabourContractComponent,
        StaffDeletFormComponent,
        StaffQualifiedComponent,
        ModalComponent,
        StaffDetailComponent,
    ]
})
export class StaffDetailModule {
}
