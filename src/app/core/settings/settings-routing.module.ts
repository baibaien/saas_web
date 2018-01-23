import {RouterModule, Routes} from "@angular/router";
// import {AccountSettingComponent} from "./account-setting/account-setting.component";
// import {CompanySettingComponent} from "./company-setting/company-setting.component";
// // import {BenifitCoverComponent} from "./company-setting/benifit-cover/benefit-cover.component";
import {NgModule} from "@angular/core";
import {BenefitCoverComponent} from "./company-setting/benefit-cover/benefit-cover.component";

const routes: Routes = [
    {path: '', redirectTo: 'account-setting', pathMatch: 'full'},
    {path: 'account-setting', loadChildren: './account-setting/account-setting.module#AccountSettingModule'},
    {path: 'company-setting', loadChildren: './company-setting/company-setting.module#CompanySettingModule'},
    {path: 'company-setting/benefit-cover/:be_id', component: BenefitCoverComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule {
}
