import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SaasIndexMainComponent} from './saas-index-main/saas-index-main.component';
import {SaasIndexAboutusComponent} from './saas-index-aboutus/saas-index-aboutus.component';
import {SaasIndexPriceComponent} from './saas-index-price/saas-index-price.component';
import {SaasIndexProductSaasComponent} from './saas-index-product-saas/saas-index-product-saas.component';
import {SaasIndexProductSystemComponent} from './saas-index-product-system/saas-index-product-system.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: SaasIndexMainComponent},
  {path: 'product-price', component: SaasIndexPriceComponent},
  {path: 'product-aboutus/:id', component: SaasIndexAboutusComponent},
  {path: 'product-function/saas', component: SaasIndexProductSaasComponent},
  {path: 'product-function/system', component: SaasIndexProductSystemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaasIndexRoutingModule {
}
