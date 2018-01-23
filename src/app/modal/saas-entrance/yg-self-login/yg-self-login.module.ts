/**
 * Created by Bonan on 2017/10/28.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import {YgSelfLoginComponent} from "./yg-self-login.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        YgSelfLoginComponent
    ],
    exports: [
        YgSelfLoginComponent
    ]
})
export class YgSelfLoginModule {}