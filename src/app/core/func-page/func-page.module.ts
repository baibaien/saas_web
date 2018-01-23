import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuncPageRoutingModule} from "./func-page-routing.module";
import {RouterSidebarComponent} from "../../common/router-sidebar/router-sidebar.component";
import {FuncPageComponent} from "./func-page.component";
import {HeaderToFooterModule} from "../../common/header-to-footer/header-to-footer.module";

@NgModule({
    imports: [
        CommonModule,
        FuncPageRoutingModule,
        HeaderToFooterModule
    ],
    declarations: [
        FuncPageComponent,
        RouterSidebarComponent,
    ]
})
export class FuncPageModule {
}
