import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceManageComponent} from './invoice-manage.component';
import {UnOutOrderComponent} from './un-out-order/un-out-order.component';
import {WaitOutOrderComponent} from './wait-out-order/wait-out-order.component';
import {OutOrderComponent} from './out-order/out-order.component';
import {InvoiceManageRoutingModule} from "./invoice-manage-routing.module";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {BaseModule} from "../../base.module";
import {InvoiceManageModalComponent} from './invoice-manage-modal/invoice-manage-modal.component';
// import {InvoiceManageSettingMComponent} from './invoice-manage-modal/invoice-manage-setting-m/invoice-manage-setting-m.component';
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {InvoiceMergeMComponent} from './invoice-manage-modal/invoice-merge-m/invoice-merge-m.component';
import {InvoiceShowMComponent} from './invoice-manage-modal/invoice-show-m/invoice-show-m.component';
import {InvoiceSettingMModule} from "../../modal/settings/account-settings/invoice-setting-m/invoice-setting-m.module";
import {BillDetailMModule} from "../../modal/bill-et-invoice/bill-detail/bill-detail-m.module";
import {BillTableModule} from "../../common-module/bill-et-invoice/bill-table/bill-table.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        InvoiceManageRoutingModule,
        MayihrTagsModule,
        MayihrPagingModule,
        InvoiceSettingMModule,
        BillDetailMModule,
        BillTableModule
    ],
    declarations: [
        InvoiceManageComponent,
        UnOutOrderComponent,
        WaitOutOrderComponent,
        OutOrderComponent,
        InvoiceManageModalComponent,
        // InvoiceManageSettingMComponent,
        InvoiceMergeMComponent,
        InvoiceShowMComponent]
})
export class InvoiceManageModule {
}
