import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderToFooterComponent} from "./header-to-footer.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeaderToFooterComponent
    ],
    exports: [
        HeaderToFooterComponent
    ]
})
export class HeaderToFooterModule {
}
