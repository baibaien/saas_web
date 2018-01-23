import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateAbsenceComponent} from "./create-absence.component";
import {MayihrDatepickerModule} from "../../../common/mayihr-datepicker/mayihr-datepicker.module";
import {BaseModule} from "../../../base.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrDatepickerModule,
    ],
    declarations: [CreateAbsenceComponent],
    exports: [CreateAbsenceComponent]
})
export class CreateAbsenceMModule {
}
