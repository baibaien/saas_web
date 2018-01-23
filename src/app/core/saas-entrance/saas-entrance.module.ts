import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaasEntranceRoutingModule} from "./saas-entrance-routing.module";
import {SaasBindPhoneComponent} from "./saas-bind-phone/saas-bind-phone.component";
import {SaasLoginComponent} from "./saas-login/saas-login.component";
import {SaasPassbackComponent} from "./saas-passback/saas-passback.component";
import {SaasPhonecheckComponent} from "./saas-phonecheck/saas-phonecheck.component";
import {SaasRegisterComponent} from "./saas-register/saas-register.component";
import {BaseModule} from "../../base.module";
import {MayihrCardNumberModule} from "../../common/mayihr-card-number/mayihr-card-number.module";
import {YgSelfLoginModule} from "../../modal/saas-entrance/yg-self-login/yg-self-login.module";
import { SaasPersonComponent } from './saas-person/saas-person.component';
import { SaasServiceConfirmComponent } from './saas-service-confirm/saas-service-confirm.component';
import {Ie9TestComponent} from "../ie9-test/ie9-test/ie9-test.component";
import {ThirdPlatformLoginComponent} from "./third-platform-login/third-platform-login.component";
import { XmLoginComponent } from './xm-login/xm-login.component';
import { SaasRegisterIe9Component } from './saas-register-ie9/saas-register-ie9.component';
import { SaasLoginIe9Component } from './saas-login-ie9/saas-login-ie9.component';
import {IndexCalcComponent} from "../../common/index-calc/index-calc.component";
import {IndexCalcModule} from "../../common/index-calc/index-calc.module";
import { XmMobileImgComponent } from './xm-mobile-img/xm-mobile-img.component';
import { ThirdPlatformErrorComponent } from './third-platform-error/third-platform-error.component';
import { SaasUpdateTestComponent } from './saas-update-test/saas-update-test.component';
import { SaasAuthorizeComponent } from './saas-authorize/saas-authorize.component';

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SaasEntranceRoutingModule,
        MayihrCardNumberModule,
        YgSelfLoginModule,
        IndexCalcModule
    ],
    declarations: [
        SaasBindPhoneComponent,
        SaasLoginComponent,
        SaasPassbackComponent,
        SaasPhonecheckComponent,
        SaasRegisterComponent,
        SaasPersonComponent,
        SaasServiceConfirmComponent,
        Ie9TestComponent,
        ThirdPlatformLoginComponent,
        XmLoginComponent,
        SaasRegisterIe9Component,
        SaasLoginIe9Component,
        XmMobileImgComponent,
        ThirdPlatformErrorComponent,
        SaasUpdateTestComponent,
        SaasAuthorizeComponent
    ]
})
export class SaasEntranceModule {
}
