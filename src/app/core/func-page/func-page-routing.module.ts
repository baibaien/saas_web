import {Router, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FuncPageComponent} from "./func-page.component";
/**
 * Created by Bonan on 2017/9/5.
 */


const routes: Routes = [
    {
        path: '', component: FuncPageComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'staff', loadChildren: '../staff-directory/staff-directory.module#StaffDirectoryModule'},
            {path: 'bill-manage', loadChildren: '../bill-manage/bill-manage.module#BillManageModule'},
            {
                path: 'bill-manage/paid-list/:id/deal-status',
                loadChildren: '../bill-deal-status/bill-deal-status.module#BillDealStatusModule'
            },
            {
                path: 'commercial-insurance',
                loadChildren: '../commercial-insurance/commercial-insurance.module#CommercialInsuranceModule'
            },
            {
                path: 'outsourcing-guide',
                loadChildren: '../outsourcing-guide/outsourcing-guide.module#OutsourcingGuideModule'
            },
            {path: 'salary-calc', loadChildren: '../salary-calc/salary-calc.module#SalaryCalcModule'},
            {
                path: 'salary-calc-history',
                loadChildren: '../salary-calc-history/salary-calc-history.module#SalaryCalcHistoryModule'
            },
            {
                path: 'social-assurance',
                loadChildren: '../social-assurance/social-assurance.module#SocialAssuranceModule'
            },
            {
                path: 'salary-outsourcing',
                loadChildren: '../salary-outsourcing/salary-outsourcing.module#SalaryOutsourcingModule'
            },
            {path: 'settings', loadChildren: '../settings/settings.module#SettingsModule'},
            {path: 'special-service', loadChildren: '../special-service/special-service.module#SpecialServiceModule'},
            {path: 'attendance', loadChildren: '../staff-attendance/staff-attendance.module#StaffAttendanceModule'},
            {path: 'invoice-manage', loadChildren: '../invoice-manage/invoice-manage.module#InvoiceManageModule'},
            {path: 'pay-schedule', loadChildren: '../pay-schedule/pay-schedule.module#PayScheduleModule'},
            {path: 'notification', loadChildren: '../notification/notification.module#NotificationModule'},
            {path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
            {
                path: 'document-center',
                loadChildren: '../document-center/document-center.module#DocumentCenterModule'
            }
        ]
    },
    // {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FuncPageRoutingModule {
}