import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffBatchUploadComponent} from './staff-batch-upload/staff-batch-upload.component';
import {StaffBatchUploadFailComponent} from './staff-batch-upload/staff-batch-upload-fail/staff-batch-upload-fail.component';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffOrgStrcComponent} from './staff-org-strc/staff-org-strc.component';
import {OrgStrcShowComponent} from './staff-org-strc/org-strc-show/org-strc-show.component';
import {StaffUploadComponent} from './staff-upload/staff-upload.component';
import {LeavePageComponent} from './staff-upload/staff-upload-modal/leave-page/leave-page.component';
import {DndModule} from 'ng2-dnd';
import {StaffDirectoryRoutingModule} from './staff-directory-routing.module';
import {BaseModule} from '../../base.module';
import {AssistModalModule} from '../../assist-modal/assist-modal.module';
import {MayihrFilterModule} from '../../common/mayihr-filter/mayihr-filter.module';
import {MayihrFilterStatusModule} from '../../common/mayihr-filter-status/mayihr-filter-status.module';
import {MayihrSearchingModule} from '../../common/mayihr-searching/mayihr-searching.module';
import {MayihrDatepickerModule} from '../../common/mayihr-datepicker/mayihr-datepicker.module';
import {MayihrPagingModule} from '../../common/mayihr-paging/mayihr-paging.module';
import {DirectiveModule} from '../../shared/directive/directive.module';
import {MayihrSelectModule} from '../../common/mayihr-select/mayihr-select.module';
import {DepartmentAddMModule} from '../../modal/staff-directory/department/department-add-m/department-add-m.module';
import {DepartmentEditMModule} from '../../modal/staff-directory/department/department-edit-m/department-edit-m.module';
import {StaffUploadPositionUpdateMModule} from "../../modal/staff-directory/upload-position-update-m/staff-upload-position-update-m.module";
import {PositionSettingMModule} from "../../modal/settings/company-settings/position-settings-m/position-setting-m.module";
import {OfficeAddrMModule} from "../../modal/settings/company-settings/office-settings-m/office-addr-m.module";
import {ContractSettingMModule} from "../../modal/settings/company-settings/contract-settings-m/contract-setting-m.module";


@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        DndModule.forRoot(),
        StaffDirectoryRoutingModule,
        AssistModalModule,
        MayihrFilterModule,
        MayihrSelectModule,
        MayihrFilterStatusModule,
        MayihrSearchingModule,
        MayihrDatepickerModule,
        MayihrPagingModule,
        DirectiveModule,
        DepartmentAddMModule,
        PositionSettingMModule,
        OfficeAddrMModule,
        ContractSettingMModule,
        DepartmentEditMModule,
        StaffUploadPositionUpdateMModule,

    ],
    declarations: [
        StaffBatchUploadComponent,
        StaffBatchUploadFailComponent,
        StaffListComponent,
        StaffOrgStrcComponent,
        OrgStrcShowComponent,
        StaffUploadComponent,
        LeavePageComponent
    ]
})
export class StaffDirectoryModule {
}
