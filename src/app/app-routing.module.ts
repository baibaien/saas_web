import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'entry', loadChildren: './core/saas-entrance/saas-entrance.module#SaasEntranceModule'},
  {path: 'index', loadChildren: './core/saas-index/saas-index.module#SaasIndexModule'},
  {path: 'user', loadChildren: './core/func-page/func-page.module#FuncPageModule'},
  {path: 'assist', loadChildren: './core/assist-center/assist-center.module#AssistCenterModule'},
  {
    path: 'social-assurance-calc',
    loadChildren: './core/social-assurance-calc/social-assurance-calc.module#SocialAssuranceCalcModule'
  },
  {path: 'error/:code', loadChildren: './core/error-page/error-page.module#ErrorPageModule'},
  {path: '**', redirectTo: 'error/404', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
