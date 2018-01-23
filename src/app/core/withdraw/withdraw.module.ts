import {NgModule} from "@angular/core";
import {WithdrawComponent} from './withdraw/withdraw.component';
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../base.module";
import {WithdrawRoutingModule} from "./withdraw-routing.module";
import { WithdrawAssuareComponent } from './withdraw-assuare/withdraw-assuare.component';
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        WithdrawRoutingModule
    ],
    declarations: [WithdrawComponent, WithdrawAssuareComponent],
    exports: [
        WithdrawComponent,
        WithdrawAssuareComponent
    ]
})
export class WithdrawModule {
}