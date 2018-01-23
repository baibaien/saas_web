/**
 * Created by Bonan on 2017/11/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MayihrSelectModule} from "../../../common/mayihr-select/mayihr-select.module";
import {BaseModule} from "../../../base.module";
import {AttendanceChangeComponent} from "./attendance-change.component";
import {AttendanceChangeRoutingModule} from "./attendance-change-routing.module";
import {MayihrPagingModule} from "../../../common/mayihr-paging/mayihr-paging.module";
import {MayihrSearchingModule} from "../../../common/mayihr-searching/mayihr-searching.module";
import {MayihrFilterModule} from "../../../common/mayihr-filter/mayihr-filter.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule,
        AttendanceChangeRoutingModule,
        MayihrPagingModule,
        MayihrSearchingModule,
        MayihrFilterModule
    ],
    declarations: [
        AttendanceChangeComponent
    ],
    exports: [
        AttendanceChangeComponent
    ]
})
export class AttendanceChangeModule {

}