import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocialAssuranceCalcComponent} from './social-assurance-calc/social-assurance-calc.component';
import {SocialAssuranceCalcRoutingModule} from "./social-assurance-calc-routing.module";
import {BaseModule} from "../../base.module";
import {MayihrDatepickerModule} from "../../common/mayihr-datepicker/mayihr-datepicker.module";
import {MayihrSelectModule} from "../../common/mayihr-select/mayihr-select.module";
import {PipeModule} from "../../shared/pipe/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SocialAssuranceCalcRoutingModule,
        MayihrDatepickerModule,
        MayihrSelectModule,
        PipeModule
    ],
    declarations: [SocialAssuranceCalcComponent]
})
export class SocialAssuranceCalcModule {
}
