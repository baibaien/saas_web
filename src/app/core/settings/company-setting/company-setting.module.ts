/**
 *
 *
 * Created by Bonan on 2017/10/20.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '../../../base.module';
import {CompanyContractComponent} from './company-setting-tags/company-contract/company-contract.component';
import {CompanyOfficeComponent} from './company-setting-tags/company-office/company-office.component';
import {CompanyPositionComponent} from './company-setting-tags/company-position/company-position.component';
import {CompanyStaffSelfComponent} from './company-setting-tags/company-staff-self/company-staff-self.component';
import {CompanySalaryComponent} from './company-setting-tags/company-salary/company-salary.component';
import {CompanySocialComponent} from './company-setting-tags/company-social/company-social.component';
import {CompanyFundComponent} from './company-setting-tags/company-fund/company-fund.component';
import {CompanyBenefitComponent} from './company-setting-tags/company-benefit/company-benefit.component';
import {CompanySettingRoutingModule} from './company-setting-routing.module';
import {CompanySettingComponent} from './company-setting.component';
import {ContractSettingMModule} from '../../../modal/settings/company-settings/contract-settings-m/contract-setting-m.module';
import {OfficeAddrMModule} from '../../../modal/settings/company-settings/office-settings-m/office-addr-m.module';
import {MayihrSearchingModule} from '../../../common/mayihr-searching/mayihr-searching.module';
import {MayihrPagingModule} from '../../../common/mayihr-paging/mayihr-paging.module';
import {PositionSettingMModule} from '../../../modal/settings/company-settings/position-settings-m/position-setting-m.module';
import {BenefitSettingMModule} from '../../../modal/settings/company-settings/benefit-settings-m/benefit-setting-m.module';
import {MayihrFilterStatusModule} from '../../../common/mayihr-filter-status/mayihr-filter-status.module';
import {MayihrFilterModule} from '../../../common/mayihr-filter/mayihr-filter.module';
import {BenefitMoneyMModule} from '../../../modal/settings/company-settings/batch-benefit-settings-m/benifit-money.module';
import {CompanyStaffSelfMModule} from '../../../modal/settings/company-settings/yg-self-setting-m/company-staff-self.module';
import {SalarySettingMModule} from '../../../modal/settings/company-settings/salary-setting-m/salary-setting-m.module';
import {SocialSettingMModule} from '../../../modal/settings/company-settings/social-rule-setting-m/social-setting-m.module';
import {FundSettingMModule} from '../../../modal/settings/company-settings/fund-rule-setting-m/fund-setting-m.module';
import {PipeModule} from '../../../shared/pipe/pipe.module';
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        CompanySettingRoutingModule,
        // -->modal
        ContractSettingMModule,
        OfficeAddrMModule,
        PositionSettingMModule,
        BenefitSettingMModule,
        BenefitMoneyMModule,
        CompanyStaffSelfMModule,
        SalarySettingMModule,
        SocialSettingMModule,
        FundSettingMModule,
        // <-----
        // -->plugin
        MayihrSearchingModule,
        MayihrPagingModule,
        MayihrFilterStatusModule,
        MayihrFilterModule,
        // <-----
        // -->pipe
        PipeModule
        // <-----
    ],
    declarations: [
        CompanySettingComponent,
        CompanyContractComponent,
        CompanyOfficeComponent,
        CompanyPositionComponent,
        CompanyStaffSelfComponent,
        CompanySalaryComponent,
        CompanySocialComponent,
        CompanyFundComponent,
        CompanyBenefitComponent],
    exports: []
})
export class CompanySettingModule {

}
