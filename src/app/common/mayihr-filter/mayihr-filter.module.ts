import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MayihrFilterComponent} from "./mayihr-filter.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [MayihrFilterComponent],
    exports: [MayihrFilterComponent]
})
export class MayihrFilterModule {
}
