import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MayihrPagingV2Component} from './mayihr-paging-v2/mayihr-paging-v2.component';
import {BaseModule} from "../../base.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [MayihrPagingV2Component],
    exports: [MayihrPagingV2Component]
})
export class MayihrPagingV2Module {
}
