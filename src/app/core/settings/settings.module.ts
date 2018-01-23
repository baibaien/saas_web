import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '../../base.module';
import {SettingRoutingModule} from './settings-routing.module';

import {MayihrSearchingModule} from '../../common/mayihr-searching/mayihr-searching.module';
import {MayihrPagingModule} from '../../common/mayihr-paging/mayihr-paging.module';
import {MayihrFilterStatusModule} from '../../common/mayihr-filter-status/mayihr-filter-status.module';
import {MayihrFilterModule} from '../../common/mayihr-filter/mayihr-filter.module';
import {BenefitCoverComponent} from './company-setting/benefit-cover/benefit-cover.component';
import {BenefitMoneyMModule} from '../../modal/settings/company-settings/batch-benefit-settings-m/benifit-money.module';

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SettingRoutingModule,
        MayihrSearchingModule,
        MayihrPagingModule,
        MayihrFilterStatusModule,
        MayihrFilterModule,
        BenefitMoneyMModule
    ],
    declarations: [
        BenefitCoverComponent,
    ]
})
export class SettingsModule {
}
