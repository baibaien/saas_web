import {RouterModule, Routes} from "@angular/router";
import {AttendanceChangeComponent} from "./attendance-change.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/11/23.
 */
const routes: Routes = [
    {path: '', component: AttendanceChangeComponent}
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AttendanceChangeRoutingModule {
}