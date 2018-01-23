import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MayihrSearchingComponent} from "./mayihr-searching.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [MayihrSearchingComponent],
    exports: [MayihrSearchingComponent]
})
export class MayihrSearchingModule {
}
