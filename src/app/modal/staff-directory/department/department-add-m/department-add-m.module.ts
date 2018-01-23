/**
 * Created by Bonan on 2017/10/23.
 */
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {DepartmentAddMComponent} from "./department-add-m.component";
import {NgModule} from "@angular/core";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        DepartmentAddMComponent
    ],
    exports: [
        DepartmentAddMComponent
    ]
})
export class DepartmentAddMModule {}