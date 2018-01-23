/**
 * Created by Bonan on 2017/11/10.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SocialAssuranceCalcComponent} from "./social-assurance-calc/social-assurance-calc.component";

const routes: Routes = [
    {path: '', component: SocialAssuranceCalcComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SocialAssuranceCalcRoutingModule {
}
