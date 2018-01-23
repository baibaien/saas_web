import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AssistHomeComponent} from "./assist-home/assist-home.component";
/**
 * Created by Bonan on 2017/11/3.
 */

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AssistHomeComponent},
    {path: 'assist-list', loadChildren: './assist-question/assist-question.module#AssistQuestionModule'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssistCenterRoutingModule {
}