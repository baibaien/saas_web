import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import {CommercialInsuranceEditModalComponent} from "./commercial-insurance-edit-modal.component";

@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        CommercialInsuranceEditModalComponent
    ],
    exports: [
        CommercialInsuranceEditModalComponent
    ]
})
export class CommercialInsuranceEditMModule {}