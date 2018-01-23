import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '../../base.module';
import {StaffAttendanceRoutingModule} from './staff-attendance-routing.module';
import {AttendanceListComponent} from './attendance-list/attendance-list.component';
import {StaffHolidayComponent} from './staff-holidy/staff-holiday.component';
import {MayihrWorkCalendarModule} from '../../common/mayihr-work-calendar/mayihr-work-calendar.module';
import {StaffAttendanceModalComponent} from './staff-attendance-modal/staff-attendance-modal.component';
import {HolidayExtendMComponent} from './staff-attendance-modal/holiday-extend-m/holiday-extend-m.component';
import {SalaryStatusComponent} from './staff-attendance-modal/salary-status/salary-status.component';
import {AssistModalModule} from '../../assist-modal/assist-modal.module';
import {MayihrFilterStatusModule} from '../../common/mayihr-filter-status/mayihr-filter-status.module';
import {MayihrFilterModule} from '../../common/mayihr-filter/mayihr-filter.module';
import {MayihrPagingModule} from '../../common/mayihr-paging/mayihr-paging.module';
import {MayihrSearchingModule} from '../../common/mayihr-searching/mayihr-searching.module';
import {MayihrDatepickerModule} from '../../common/mayihr-datepicker/mayihr-datepicker.module';
import {PipeModule} from "../../shared/pipe/pipe.module";
import {
    CreateAbsenceMModule,
} from "../../modal/staff-attendance/create-absence/create-absence-m.module";
import {CreateOvertimeMModule} from "../../modal/staff-attendance/create-overtime/create-overtime.module";

@NgModule({
    imports: [
        CommonModule,
        MayihrWorkCalendarModule,
        BaseModule,
        StaffAttendanceRoutingModule,
        // CommonModalModule,
        AssistModalModule,
        MayihrFilterStatusModule,
        MayihrFilterModule,
        MayihrPagingModule,
        MayihrSearchingModule,
        MayihrDatepickerModule,
        PipeModule,
        CreateOvertimeMModule,
        CreateAbsenceMModule,
    ],
    declarations: [
        AttendanceListComponent,
        StaffHolidayComponent,
        StaffAttendanceModalComponent,
        HolidayExtendMComponent,
        SalaryStatusComponent,
        // UnableEditComponent
    ]
})
export class StaffAttendanceModule {
}
