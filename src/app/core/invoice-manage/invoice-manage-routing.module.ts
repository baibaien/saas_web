import {RouterModule, Routes} from "@angular/router";
import {UnOutOrderComponent} from "./un-out-order/un-out-order.component";
import {WaitOutOrderComponent} from "./wait-out-order/wait-out-order.component";
import {OutOrderComponent} from "./out-order/out-order.component";
import {NgModule} from "@angular/core";
import {InvoiceManageComponent} from "./invoice-manage.component";
/**
 * Created by Bonan on 2017/9/7.
 */
const routes: Routes = [
    {
        path: '', component: InvoiceManageComponent,
        children: [
            {path: '', redirectTo: 'uninvoiced', pathMatch: 'full'},
            {path: 'uninvoiced', component: UnOutOrderComponent},
            {path: 'wait-out', component: WaitOutOrderComponent},
            {path: 'invoiced', component: OutOrderComponent}
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceManageRoutingModule {
}