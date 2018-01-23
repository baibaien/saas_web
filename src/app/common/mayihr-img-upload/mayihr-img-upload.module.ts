/**
 * Created by Bonan on 2017/11/8.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../base.module";
import {MayihrImgUploadComponent} from './mayihr-img-upload.component';
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [MayihrImgUploadComponent],
    exports: [MayihrImgUploadComponent]
})
export class MayihrImgUploadModule {
}