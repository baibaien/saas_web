import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaasIndexConsultComponent} from './saas-index-common/saas-index-consult/saas-index-consult.component';
import {SaasIndexSignComponent} from './saas-index-common/saas-index-sign/saas-index-sign.component';
import {SaasIndexFooterComponent} from './saas-index-common/saas-index-footer/saas-index-footer.component';
import {SaasIndexAboutusComponent} from './saas-index-aboutus/saas-index-aboutus.component';
import {SaasIndexPriceComponent} from './saas-index-price/saas-index-price.component';
import {SaasIndexMainComponent} from './saas-index-main/saas-index-main.component';
import {SaasIndexRoutingModule} from './saas-index-routing.module';
import {SaasIndexHeaderComponent} from './saas-index-common/saas-index-header/saas-index-header.component';
import {SaasIndexProductSaasComponent} from './saas-index-product-saas/saas-index-product-saas.component';
import {SaasIndexProductSystemComponent} from './saas-index-product-system/saas-index-product-system.component';
import {IndexCalcModule} from "../../common/index-calc/index-calc.module";
import {FormsModule} from "@angular/forms";
import {BaseModule} from "../../base.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        // FormsModule,
        SaasIndexRoutingModule,
        IndexCalcModule
    ],
    declarations: [
        SaasIndexConsultComponent,
        SaasIndexSignComponent,
        SaasIndexFooterComponent,
        SaasIndexAboutusComponent,
        SaasIndexPriceComponent,
        SaasIndexMainComponent,
        SaasIndexHeaderComponent,
        SaasIndexProductSaasComponent,
        SaasIndexProductSystemComponent
    ]
})
export class SaasIndexModule {
}
