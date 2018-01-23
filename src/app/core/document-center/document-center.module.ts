import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentCenterComponent} from './document-center/document-center.component';
import {DocumentCenterRoutingModule} from "./document-center-routing.module";
import {MayihrPagingV2Module} from "../../common/mayihr-paging-v2/mayihr-paging-v2.module";
import {PipeModule} from "../../shared/pipe/pipe.module";

@NgModule({
    imports: [
        CommonModule,
        DocumentCenterRoutingModule,
        MayihrPagingV2Module,
        PipeModule,
    ],
    declarations: [DocumentCenterComponent]
})
export class DocumentCenterModule {
}
