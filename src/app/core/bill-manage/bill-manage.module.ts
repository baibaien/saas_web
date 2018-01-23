import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from "../../base.module";
import {BillManageComponent} from "./bill-manage/bill-manage.component";
import {PayManageComponent} from "./pay-manage/pay-manage.component";
import {BillManageRoutingModule} from "./bill-manage-routing.module";
import {AssistModalModule} from "../../assist-modal/assist-modal.module";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {UnpaidBillComponent} from './unpaid-bill/unpaid-bill.component';
import {PaidBillComponent} from './paid-bill/paid-bill.component';
import {BillManageBoxComponent} from "./bill-manage-box.component";
import {BillManageModalComponent} from './bill-manage-modal/bill-manage-modal.component';
import {OrderSendMComponent} from './bill-manage-modal/order-send-m/order-send-m.component';
import {
    InvoiceSettingMModule
} from "../../modal/settings/account-settings/invoice-setting-m/invoice-setting-m.module";
import {BillDetailMModule} from "../../modal/bill-et-invoice/bill-detail/bill-detail-m.module";
import {BillTableModule} from "../../common-module/bill-et-invoice/bill-table/bill-table.module";
import {BillDealStatusComponent} from "../bill-deal-status/bill-deal-status.component";
import {MayihrImgUploadModule} from "../../common/mayihr-img-upload/mayihr-img-upload.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        BillManageRoutingModule,
        AssistModalModule,
        MayihrTagsModule,
        MayihrPagingModule,
        MayihrImgUploadModule,
        InvoiceSettingMModule,
        BillDetailMModule,
        BillTableModule
    ],
    declarations: [
        BillManageComponent,
        PayManageComponent,
        UnpaidBillComponent,
        PaidBillComponent,
        BillManageBoxComponent,
        BillManageModalComponent,
        OrderSendMComponent,
    ]
})
export class BillManageModule {
}
