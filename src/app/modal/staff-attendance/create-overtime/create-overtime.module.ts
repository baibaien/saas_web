import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateOvertimeComponent} from "./create-overtime.component";
import {MayihrDatepickerModule} from "../../../common/mayihr-datepicker/mayihr-datepicker.module";
import {BaseModule} from "../../../base.module";

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    MayihrDatepickerModule,
  ],
  declarations: [CreateOvertimeComponent],
  exports: [CreateOvertimeComponent]
})
export class CreateOvertimeMModule { }
