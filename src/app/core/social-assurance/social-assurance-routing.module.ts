import {RouterModule, Routes} from "@angular/router";
import {SocialAssuranceComponent} from "./social-assurance/social-assurance.component";
import {SocialAssuranceHistoryComponent} from "./social-assurance-history/social-assurance-history.component";
import {SocialAssuranceHistoryDetailComponent} from "./social-assurance-history-detail/social-assurance-history-detail.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/9/7.
 */
const routes: Routes = [
    {path: '', component: SocialAssuranceComponent},
    {path: 'history', component: SocialAssuranceHistoryComponent},
    {path: 'history/:month', component: SocialAssuranceHistoryDetailComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SocialAssuranceRoutingModule{}
