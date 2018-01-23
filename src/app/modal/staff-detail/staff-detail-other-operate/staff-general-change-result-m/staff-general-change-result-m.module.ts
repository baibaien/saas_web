/**
 * Created by Bonan on 2017/10/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {StaffGeneralChangeResultMComponent} from "./staff-general-change-result-m.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        StaffGeneralChangeResultMComponent
    ],
    exports: [
        StaffGeneralChangeResultMComponent
    ]
})
export class StaffGeneralChangeResultMModule {}