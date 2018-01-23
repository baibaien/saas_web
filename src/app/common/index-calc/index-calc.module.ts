import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCalcComponent } from './index-calc.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IndexCalcComponent],
  exports: [
      IndexCalcComponent
  ]
})
export class IndexCalcModule { }
