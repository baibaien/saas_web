import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MayihrCardNumberComponent} from "./mayihr-card-number.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      MayihrCardNumberComponent
  ],
  exports: [
      MayihrCardNumberComponent
  ]
})
export class MayihrCardNumberModule { }
