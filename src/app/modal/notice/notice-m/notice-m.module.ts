import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoticeMComponent} from './notice-m.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NoticeMComponent],
    exports: [
        NoticeMComponent
    ]
})
export class NoticeMModule {
}
