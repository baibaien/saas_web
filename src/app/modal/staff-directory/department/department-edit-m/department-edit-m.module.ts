/**
 * Created by Bonan on 2017/10/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {DepartmentEditMComponent} from "./department-edit-m.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        DepartmentEditMComponent
    ],
    exports: [
        DepartmentEditMComponent
    ]
})
export class DepartmentEditMModule {}