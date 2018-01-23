/**
 * Created by Bonan on 2017/11/27.
 */
import {NgModule} from "@angular/core";
import {WithdrawComponent} from "./withdraw/withdraw.component";
import {RouterModule, Routes} from "@angular/router";
import {WithdrawAssuareComponent} from "./withdraw-assuare/withdraw-assuare.component";

const routes: Routes = [
    {path: '', component: WithdrawComponent},
    {path: 'assure', component: WithdrawAssuareComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class WithdrawRoutingModule {
}