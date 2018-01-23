import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MayihrWorkCalendarComponent} from "./mayihr-work-calendar.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      MayihrWorkCalendarComponent
  ],
  exports: [
      MayihrWorkCalendarComponent
  ]
})
export class MayihrWorkCalendarModule { }
