import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocialAssuranceComponent} from "./social-assurance/social-assurance.component";
import {SocialAssuranceHistoryComponent} from "./social-assurance-history/social-assurance-history.component";
import {SocialAssuranceHistoryDetailComponent} from "./social-assurance-history-detail/social-assurance-history-detail.component";
import {BaseModule} from "../../base.module";
import {SocialAssuranceRoutingModule} from "./social-assurance-routing.module";
import {MayihrTagsModule} from "../../common/mayihr-tags/mayihr-tags.module";
import {MayihrSearchingModule} from "../../common/mayihr-searching/mayihr-searching.module";
import {MayihrPagingModule} from "../../common/mayihr-paging/mayihr-paging.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SocialAssuranceRoutingModule,
        MayihrTagsModule,
        MayihrSearchingModule,
        MayihrPagingModule
    ],
    declarations: [SocialAssuranceComponent,
        SocialAssuranceHistoryComponent,
        SocialAssuranceHistoryDetailComponent
    ]
})
export class SocialAssuranceModule {
}
