/**
 * Created by Bonan on 2017/10/20.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {OfficeAddrComponent} from "./office-addr.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        OfficeAddrComponent
    ],
    exports: [
        OfficeAddrComponent
    ]
})
export class OfficeAddrMModule {}