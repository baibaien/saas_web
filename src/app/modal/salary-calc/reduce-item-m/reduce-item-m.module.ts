/**
 * Created by Bonan on 2017/11/22.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import { ReduceItemMComponent } from './reduce-item-m.component';
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [ReduceItemMComponent],
    exports: [
        ReduceItemMComponent
    ]
})
export class ReduceItemMModule {
}