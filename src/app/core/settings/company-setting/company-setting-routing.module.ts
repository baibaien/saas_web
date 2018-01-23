import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompanySettingComponent} from "./company-setting.component";
import {CompanyContractComponent} from "./company-setting-tags/company-contract/company-contract.component";
import {CompanyOfficeComponent} from "./company-setting-tags/company-office/company-office.component";
import {CompanyPositionComponent} from "./company-setting-tags/company-position/company-position.component";
import {CompanyBenefitComponent} from "./company-setting-tags/company-benefit/company-benefit.component";
import {CompanyStaffSelfComponent} from "./company-setting-tags/company-staff-self/company-staff-self.component";
import {CompanySalaryComponent} from "./company-setting-tags/company-salary/company-salary.component";
import {CompanySocialComponent} from "./company-setting-tags/company-social/company-social.component";
import {CompanyFundComponent} from "./company-setting-tags/company-fund/company-fund.component";


const routes: Routes = [
    {
        path: '', component: CompanySettingComponent,
        children: [
            {path: '', redirectTo: 'contract', pathMatch: 'full'},
            {path: 'contract', component: CompanyContractComponent},
            {path: 'office', component: CompanyOfficeComponent},
            {path: 'position', component: CompanyPositionComponent},
            {path: 'benefit', component: CompanyBenefitComponent},
            {path: 'staff-self', component: CompanyStaffSelfComponent},
            {path: 'salary', component: CompanySalaryComponent},
            {path: 'social', component: CompanySocialComponent},
            {path: 'fund', component: CompanyFundComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanySettingRoutingModule {
}
