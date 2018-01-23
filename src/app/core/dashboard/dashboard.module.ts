import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {BaseModule} from "../../base.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {AngularEchartsModule} from "ngx-echarts";
import {NoticeMModule} from "../../modal/notice/notice-m/notice-m.module";
import {MayihrVerTipsModule} from "../../common/mayihr-ver-tips/mayihr-ver-tips.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        DashboardRoutingModule,
        AngularEchartsModule,
        NoticeMModule,
        MayihrVerTipsModule
    ],
    declarations: [DashboardComponent],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
