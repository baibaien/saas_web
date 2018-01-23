/**
 * Created by Bonan on 2017/10/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {MayihrDatepickerModule} from "../../../../common/mayihr-datepicker/mayihr-datepicker.module";
import {StaffGeneralFormalDateChangeMComponent} from "./staff-general-formal-date-change-m.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrDatepickerModule
    ],
    declarations: [
        StaffGeneralFormalDateChangeMComponent
    ],
    exports: [
        StaffGeneralFormalDateChangeMComponent
    ]
})
export class StaffGeneralFormalDateChangeMModule {}