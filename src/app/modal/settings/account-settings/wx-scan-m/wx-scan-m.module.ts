/**
 * Created by Bonan on 2017/10/20.
 */


import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {WxScanComponent} from "./wx-scan.component";
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WxScanComponent
    ],
    exports: [
        WxScanComponent
    ]
})
export class WxScanMModule {}