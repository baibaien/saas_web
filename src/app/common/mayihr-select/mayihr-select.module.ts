import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MayihrSelectComponent} from './mayihr-select.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipeModule} from "../../shared/pipe/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule
    ],
    declarations: [MayihrSelectComponent],
    exports: [MayihrSelectComponent]
})
export class MayihrSelectModule {
}
