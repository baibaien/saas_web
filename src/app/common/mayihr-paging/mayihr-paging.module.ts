import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MayihrPagingComponent} from "./mayihr-paging.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MayihrPagingComponent
    ],
    exports: [
        MayihrPagingComponent
    ]
})
export class MayihrPagingModule {
}
