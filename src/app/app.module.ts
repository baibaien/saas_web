import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseResponseOptions, Http, HttpModule, Jsonp, JsonpModule, RequestOptions, XHRBackend} from '@angular/http';
import {AppComponent} from './app.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {AccountSettingsService} from './shared/service/api-service/account-settings/account-settings.service';
import {SettingsService} from 'app/shared/service/settings/settings.service';
import {NameHookService} from './shared/service/staff-directory/name-hook/name-hook.service';
import {FilterTermService} from './shared/service/staff-directory/filter-term/filter-term.service';
import {StaffListService} from './shared/service/staff-directory/staff-list/staff-list.service';
import {StaffUploadService} from './shared/service/staff-directory/staff-upload/staff-upload.service';
import {HrChangeService} from './shared/service/api-service/staff-directory/hr-change/hr-change.service';
import {HrAreasService} from './shared/service/api-service/staff-directory/hr-areas/hr-areas.service';
import {OfficeAddressesService} from './shared/service/api-service/staff-directory/office-addresses/office-addresses.service';
import {OrganizationsService} from './shared/service/api-service/staff-directory/organizations/organizations.service';
import {StaffEduService} from './shared/service/api-service/staff-directory/staff-edu/staff-edu.service';
import {StaffFamiliesService} from './shared/service/api-service/staff-directory/staff-families/staff-families.service';
import {StaffWorksService} from './shared/service/api-service/staff-directory/staff-works/staff-works.service';
import {MyRequestOptions, UsersService} from 'app/shared/service/api-service/users/users.service';
import {StaffsService} from './shared/service/api-service/staff-directory/staffs/staffs.service';
import {SocialBaseService} from './shared/service/api-service/staff-directory/social-base/social-base.service';
import {StaffDetailService} from './shared/service/staff-directory/staff-detail/staff-detail.service';
import {AttendanceService} from './shared/service/api-service/staff-attendance/attendance/attendance.service';
import {AttendanceTokenService} from './shared/service/api-service/staff-attendance/attendance-token/attendance-token.service';
import {StaffOutlineService} from './shared/service/staff-attendance/staff-outline/staff-outline.service';
import {FormFormatService} from './shared/service/form-format/form-format.service';
import {DateService} from './shared/service/date/date.service';
import {SalaryCalcService} from 'app/shared/service/salary-calc/salary-calc/salary-calc.service';
import {SalaryApiService} from './shared/service/api-service/salary-api/salary-api.service';
import {ModalService} from './shared/service/modal/modal.service';
import {IdNameService} from './shared/service/id-name/id-name.service';
import {SalaryItemChangeService} from 'app/shared/service/salary-calc/salary-item-change/salary-item-change.service';
import {SalaryItemChangeApiService} from './shared/service/api-service/salary-api/salary-item-change-api/salary-item-change-api.service';
import {RootApiService} from 'app/shared/service/api-service/root-api/root-api.service';
import {AttendanceAdjustService} from './shared/service/salary-calc/attendance-adjust/attendance-adjust.service';
import {SalaryHistoryApiService} from './shared/service/api-service/salary-api/salary-histroy/salary-history-api.service';
import {SocialAssuranceApiService} from 'app/shared/service/api-service/salary-api/social-assurance-api/social-assurance-api.service';
import {GlobalFuncService} from './shared/service/global-func/global-func.service';
import {CommonService} from './shared/service/api-service/common/common.service';
import {CompanySettingsService} from './shared/service/api-service/company-settings/company-settings.service';
import {LoginService} from './shared/service/login/login.service';
import {SocialAssuranceService} from 'app/shared/service/salary-calc/social-assurance/social-assurance.service';
import {MayihrFilterService} from './shared/service/mayihr-filter/mayihr-filter.service';
import {BillManageApiService} from 'app/shared/service/api-service/bill-manage-api/bill-manage-api.service';
import {BillManageService} from './shared/service/bill-manage/bill-manage.service';
import {HttpService} from './shared/service/http-service/http.service';
import {SalaryOutsourcingApiService} from './shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service';
import {TestServiceService} from './shared/service/test-service/test-service.service';
import {SpecialServiceApiService} from './shared/service/api-service/special-service-api/special-service-api.service';
import {InvoiceApiService} from "./shared/service/api-service/invoice-api/invoice-api.service";
import {AssistModalService} from "./shared/service/assist-modal-service/assist-modal.service";
import {AssistModalModule} from "./assist-modal/assist-modal.module";
import {LoadingBarService} from "./shared/loading-bar/loading-bar.service";
import {CustomHttp} from "./shared/service/customHttp/customHttp";
import {LoadingBarComponent} from "./shared/loading-bar/loading-bar.component";
import {PayScheduleService} from "./shared/service/pay-schedule/pay-schedule.service";
import {PayScheduleApiService} from "./shared/service/api-service/pay-schedule-api/pay-schedule-api.service";
import {DashboardApiService} from "./shared/service/api-service/dashboard-api/dashboard-api.service";
import {AssistCenterApiService} from "./shared/service/api-service/assist-center-api/assist-center-api.service";
import {ImgService} from "./shared/service/common-service/img-service/img.service";
import {WithdrawApiService} from "./shared/service/api-service/withdraw-api/withdraw-api.service";
import {WithdrawService} from "./shared/service/withdraw/withdraw.service";
import {UserStatusService} from "./shared/service/user-status-service/user-status.service";
import {ThirdPlatformServiceService} from "./shared/service/third-platform/third-platform-service.service";
import {ThirdPlatformApiServiceService} from "./shared/service/api-service/third-platform-api/third-platform-api-service.service";
import {SaasIndexService} from "./shared/service/saas-index/saas-index.service";
import {IndexService} from "./shared/service/api-service/index/index.service";


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoadingBarComponent
    ],
    imports: [
        JsonpModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AssistModalModule,
    ],
    providers: [
        AccountSettingsService,
        SettingsService,
        NameHookService,
        FilterTermService,
        StaffListService,
        StaffUploadService,
        HrChangeService,
        HrAreasService,
        OfficeAddressesService,
        OrganizationsService,
        StaffEduService,
        StaffFamiliesService,
        StaffWorksService,
        StaffsService,
        UsersService,
        BaseResponseOptions,
        SocialBaseService,
        StaffDetailService,
        AttendanceService,
        AttendanceTokenService,
        StaffOutlineService,
        FormFormatService,
        DateService,
        IdNameService,
        SalaryCalcService,
        SalaryApiService,
        SaasIndexService,
        IndexService,
        ModalService,
        SalaryItemChangeApiService,
        SalaryItemChangeService,
        RootApiService,
        AttendanceAdjustService,
        SalaryHistoryApiService,
        SocialAssuranceService,
        GlobalFuncService,
        SocialAssuranceApiService,
        CommonService,
        CompanySettingsService,
        LoginService,
        MayihrFilterService,
        LoadingBarService,
        {
            provide: Http,
            useClass: CustomHttp,
            deps: [XHRBackend, RequestOptions, LoadingBarService]
        },
        {provide: RequestOptions, useClass: MyRequestOptions},
        BillManageApiService,
        BillManageService,
        HttpService,
        SalaryOutsourcingApiService,
        TestServiceService,
        SpecialServiceApiService,
        InvoiceApiService,
        AssistModalService,
        PayScheduleService,
        PayScheduleApiService,
        DashboardApiService,
        AssistCenterApiService,
        ImgService,
        WithdrawApiService,
        WithdrawService,
        UserStatusService,
        ThirdPlatformServiceService,
        ThirdPlatformApiServiceService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
