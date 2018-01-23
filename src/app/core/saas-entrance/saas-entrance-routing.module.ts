import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SaasLoginComponent} from './saas-login/saas-login.component';
import {SaasPassbackComponent} from './saas-passback/saas-passback.component';
import {SaasPhonecheckComponent} from './saas-phonecheck/saas-phonecheck.component';
import {SaasRegisterComponent} from './saas-register/saas-register.component';
import {SaasPersonComponent} from './saas-person/saas-person.component';
import {SaasServiceConfirmComponent} from './saas-service-confirm/saas-service-confirm.component';
import {Ie9TestComponent} from "../ie9-test/ie9-test/ie9-test.component";
import {ThirdPlatformLoginComponent} from "./third-platform-login/third-platform-login.component";
import {XmLoginComponent} from "./xm-login/xm-login.component";
import {SaasRegisterIe9Component} from "./saas-register-ie9/saas-register-ie9.component";
import {SaasLoginIe9Component} from "./saas-login-ie9/saas-login-ie9.component";
import {XmMobileImgComponent} from "./xm-mobile-img/xm-mobile-img.component";
import {ThirdPlatformErrorComponent} from "./third-platform-error/third-platform-error.component";
import {SaasUpdateTestComponent} from "./saas-update-test/saas-update-test.component";
import {SaasAuthorizeComponent} from "./saas-authorize/saas-authorize.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: SaasLoginComponent},
  {path: 'passback', component: SaasPassbackComponent},
  {path: 'phonecheck', component: SaasPhonecheckComponent},
  {path: 'register', component: SaasRegisterComponent},
  {path: 'person', component: SaasPersonComponent},
  {path: 'service-confirm', component: SaasServiceConfirmComponent},
  {path: 'ie9-test', component: Ie9TestComponent},
  {path: 'third-platform-login', component: ThirdPlatformLoginComponent},
  {path: 'third-platform-login-xm', component: ThirdPlatformLoginComponent},
  {path: 'third-platform-error', component: ThirdPlatformErrorComponent},
  {path: 'register-ie9', component: SaasRegisterIe9Component},
  {path: 'login-ie9', component: SaasLoginIe9Component},
  {path: 'authorize', component: SaasAuthorizeComponent},
  {path: 'third-platform-login-xm-mobile', component: XmMobileImgComponent},
  {path: 'test', component: SaasUpdateTestComponent},
  {path: '**', component: SaasLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaasEntranceRoutingModule {
}
