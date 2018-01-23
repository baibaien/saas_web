/**
 * Created by Bonan on 2017/11/6.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import {StaffUncompletedComponent} from './staff-uncompleted/staff-uncompleted.component';
import {StaffUncompletedRoutingModule} from "./staff-uncompleted-routing.module";
import {MayihrPagingModule} from "../../../common/mayihr-paging/mayihr-paging.module";
import {MayihrSearchingModule} from "../../../common/mayihr-searching/mayihr-searching.module";
import {MayihrFilterModule} from "../../../common/mayihr-filter/mayihr-filter.module";
import {MayihrFilterStatusModule} from "../../../common/mayihr-filter-status/mayihr-filter-status.module";
import { StaffAddInfoComponent } from './staff-add-info/staff-add-info.component';
import {MayihrSelectModule} from "../../../common/mayihr-select/mayihr-select.module";
import {MayihrImgUploadModule} from "../../../common/mayihr-img-upload/mayihr-img-upload.module";
import {StaffHosiptalMModule} from "../../../modal/staff-detail/staff-detail/staff-hospital-m/staff-hospital-m.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        StaffUncompletedRoutingModule,
        MayihrPagingModule,
        MayihrSearchingModule,
        MayihrFilterModule,
        MayihrFilterStatusModule,
        MayihrSelectModule,
        MayihrImgUploadModule,
        StaffHosiptalMModule
    ],
    declarations: [StaffUncompletedComponent, StaffAddInfoComponent],
})
export class StaffUncompletedModule {

}