import {RouterModule, Routes} from "@angular/router";
import {BillManageComponent} from "./bill-manage/bill-manage.component";
import {PayManageComponent} from "./pay-manage/pay-manage.component";
import {NgModule} from "@angular/core";
import {BillManageBoxComponent} from "./bill-manage-box.component";
import {UnpaidBillComponent} from "./unpaid-bill/unpaid-bill.component";
import {PaidBillComponent} from "./paid-bill/paid-bill.component";
const routes: Routes = [
    {
        path: '', component: BillManageBoxComponent,
        children: [
            {path: '', redirectTo: 'bill-list', pathMatch: 'full'},
            {path: 'bill-list', component: BillManageComponent},
            {path: 'unpaid-list', component: UnpaidBillComponent},
            {path: 'paid-list', component: PaidBillComponent},
        ]
    },
    {path: 'pay', component: PayManageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillManageRoutingModule {
}
