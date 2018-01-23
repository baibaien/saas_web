/**
 * Created by Bonan on 2017/11/13.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AssistQuestionDetailComponent} from "./assist-question-detail/assist-question-detail.component";
import {AssistQuestionComponent} from "./assist-question.component";
const routes: Routes = [
    {path: '', redirectTo: ':id', pathMatch: 'full'},
    {
        path: ':id', component: AssistQuestionComponent, children: [
        {path: ':qid', component: AssistQuestionDetailComponent}
    ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AssistQuestionRoutingModule {
}