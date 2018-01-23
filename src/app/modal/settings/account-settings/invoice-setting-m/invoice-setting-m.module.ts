import {NgModule} from "@angular/core";
import {BaseModule} from "app/base.module";
import {CommonModule} from "@angular/common";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {InvoiceSettingMComponent} from "./invoice-setting-m.component";
/**
 * Created by Bonan on 2017/10/19.
 */
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        InvoiceSettingMComponent
    ],
    exports: [
        InvoiceSettingMComponent
    ]
})
export class InvoiceSettingMModule {}
