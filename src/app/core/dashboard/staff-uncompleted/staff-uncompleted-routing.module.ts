import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaffUncompletedComponent} from "./staff-uncompleted/staff-uncompleted.component";
import {StaffAddInfoComponent} from "./staff-add-info/staff-add-info.component";


const routes: Routes = [
    {path: '', redirectTo: 'uncompleted', pathMatch: 'full'},
    {path: 'uncompleted', component: StaffUncompletedComponent},
    {path: 'add-info/:id/:status', component: StaffAddInfoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StaffUncompletedRoutingModule {
}
