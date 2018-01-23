/**
 * Created by Bonan on 2017/10/23.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '../../../../base.module';
import {StaffHospitalComponent} from './staff-hospital.component';
@NgModule({
  imports: [
    CommonModule,
    BaseModule
  ],
  declarations: [
    StaffHospitalComponent
  ],
  exports: [
    StaffHospitalComponent
  ]
})
export class StaffHosiptalMModule {}
