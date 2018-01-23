import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MayihrDatepickerComponent} from "./mayihr-datepicker.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [MayihrDatepickerComponent],
    exports: [
        MayihrDatepickerComponent
    ]
})
export class MayihrDatepickerModule {
}
