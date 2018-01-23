import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchFilter} from "./search-filter";
import {LongStringFilterPipe} from "./long-string-filter-pipe";
import { HourToDayPipe } from './hour-to-day/hour-to-day.pipe';
import {MonthCalcPipe} from "./month-calc-pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchFilter, LongStringFilterPipe, HourToDayPipe, MonthCalcPipe],
  exports: [
      SearchFilter, LongStringFilterPipe, HourToDayPipe, MonthCalcPipe
  ]
})
export class PipeModule { }
