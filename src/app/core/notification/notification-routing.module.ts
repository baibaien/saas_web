import {RouterModule, Routes} from "@angular/router";
import {NotificationListComponent} from "./notification-list/notification-list.component";
import {NotificationDetailComponent} from "./notification-detail/notification-detail.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/11/9.
 */
const routes: Routes = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {path: 'list', component: NotificationListComponent},
    {path: 'list/:id/detail', component: NotificationDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationRoutingModule {
}