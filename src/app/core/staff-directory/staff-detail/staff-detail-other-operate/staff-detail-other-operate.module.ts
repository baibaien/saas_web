/**
 * Created by Bonan on 2017/10/23.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '../../../../base.module';
import {StaffPersonnalChangeComponent} from './staff-personal-change/staff-personnal-change.component';
import {StaffAttendanceLogComponent} from './staff-attendance-log/staff-attendance-log.component';
import {StaffChangeLogComponent} from './staff-change-log/staff-change-log.component';
import {StaffRehireComponent} from './staff-rehire/staff-rehire.component';
import {StaffDimissionComponent} from './staff-personal-change/staff-dimission/staff-dimission.component';
import {StaffGeneralChangeComponent} from './staff-personal-change/staff-general-change/staff-general-change.component';
import {StaffGeneralFormalDateChangeMModule} from '../../../../modal/staff-detail/staff-detail-other-operate/staff-general-formal-date-change-m/staff-general-formal-date-change-m.module';
import {StaffGeneralChangeResultMModule} from '../../../../modal/staff-detail/staff-detail-other-operate/staff-general-change-result-m/staff-general-change-result-m.module';
import {DemissionCalcMModule} from '../../../../modal/staff-detail/staff-detail-other-operate/demission-calc-m/demission-calc-m.module';
import {StaffDetailOtherOperateRoutingModule} from './staff-detail-other-operate-routing.module';
import {MayihrDatepickerModule} from '../../../../common/mayihr-datepicker/mayihr-datepicker.module';
import {DirectiveModule} from '../../../../shared/directive/directive.module';
import {StaffUploadPositionUpdateMModule} from '../../../../modal/staff-directory/upload-position-update-m/staff-upload-position-update-m.module';
import {ContractSettingMModule} from '../../../../modal/settings/company-settings/contract-settings-m/contract-setting-m.module';
import {DepartmentAddMModule} from '../../../../modal/staff-directory/department/department-add-m/department-add-m.module';
import {PositionSettingMModule} from '../../../../modal/settings/company-settings/position-settings-m/position-setting-m.module';
import {OfficeAddrMModule} from '../../../../modal/settings/company-settings/office-settings-m/office-addr-m.module';
import {CreateAbsenceMModule} from '../../../../modal/staff-attendance/create-absence/create-absence-m.module';
import {CreateOvertimeMModule} from '../../../../modal/staff-attendance/create-overtime/create-overtime.module';
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        StaffDetailOtherOperateRoutingModule,
        StaffGeneralFormalDateChangeMModule,
        StaffGeneralChangeResultMModule,
        DemissionCalcMModule,
        MayihrDatepickerModule,
        DirectiveModule,
        StaffUploadPositionUpdateMModule,
        DepartmentAddMModule,
        PositionSettingMModule,
        OfficeAddrMModule,
        ContractSettingMModule,
        CreateAbsenceMModule,
        CreateOvertimeMModule
    ],
    declarations: [
        StaffPersonnalChangeComponent,
        StaffAttendanceLogComponent,
        StaffChangeLogComponent,
        StaffRehireComponent,
        StaffDimissionComponent,
        StaffGeneralChangeComponent,
    ]
})
export class StaffDetailOtherOperateModule {}