/**
 * Created by Bonan on 2017/11/1.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import {StaffUploadPositionUpdateMComponent} from "./staff-upload-position-update-m.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        StaffUploadPositionUpdateMComponent
    ],
    exports: [
        StaffUploadPositionUpdateMComponent
    ]
})
export class StaffUploadPositionUpdateMModule {}