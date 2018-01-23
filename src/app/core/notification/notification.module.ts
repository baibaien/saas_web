/**
 * Created by Bonan on 2017/11/9.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationDetailComponent} from './notification-detail/notification-detail.component';
import {NotificationRoutingModule} from "./notification-routing.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";
import {MayihrPagingV2Module} from "../../common/mayihr-paging-v2/mayihr-paging-v2.module";
@NgModule({
    imports: [
        CommonModule,
        NotificationRoutingModule,
        MayihrPagingModule,
        MayihrPagingV2Module
    ],
    declarations: [NotificationListComponent, NotificationDetailComponent]
})
export class NotificationModule {
}