import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayScheduleComponent } from './pay-schedule/pay-schedule.component';
import { PersonnalPayScheduleComponent } from './personnal-pay-schedule/personnal-pay-schedule.component';
import {BaseModule} from "../../base.module";
import {PayScheduleRoutingModule} from "./pay-schedule-router.module";
import {PipeModule} from "../../shared/pipe/pipe.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";

@NgModule({
  imports: [
    CommonModule,
      BaseModule,
      PayScheduleRoutingModule,
      PipeModule,
      MayihrPagingModule
  ],
  declarations: [PayScheduleComponent, PersonnalPayScheduleComponent]
})
export class PayScheduleModule { }
