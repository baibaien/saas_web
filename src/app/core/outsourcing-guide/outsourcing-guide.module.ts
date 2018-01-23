import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OutsourcingGuideRoutingModule} from "./outsourcing-guide-routing.module";
import {OutsourcingGuideComponent} from "./outsourcing-guide.component";
import {BaseModule} from "../../base.module";
import {AssistModalModule} from "../../assist-modal/assist-modal.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        OutsourcingGuideRoutingModule,
        AssistModalModule
    ],
    declarations: [
        OutsourcingGuideComponent
    ]
})
export class OutsourcingGuideModule {
}
