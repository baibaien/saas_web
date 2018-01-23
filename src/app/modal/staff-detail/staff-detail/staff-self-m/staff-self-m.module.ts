/**
 * Created by Bonan on 2017/10/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {StaffSelfMComponent} from "./staff-self-m.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        StaffSelfMComponent
    ],
    exports: [
        StaffSelfMComponent
    ]
})
export class StaffSaleMModule {}