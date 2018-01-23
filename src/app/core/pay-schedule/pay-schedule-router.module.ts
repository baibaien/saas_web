import {RouterModule, Routes} from "@angular/router";
import {PayScheduleComponent} from "./pay-schedule/pay-schedule.component";
import {PersonnalPayScheduleComponent} from "./personnal-pay-schedule/personnal-pay-schedule.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {path: '', component: PayScheduleComponent},
    {path: ':id', component: PersonnalPayScheduleComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PayScheduleRoutingModule {
}