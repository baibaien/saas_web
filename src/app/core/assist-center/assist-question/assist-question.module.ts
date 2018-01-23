/**
 * Created by Bonan on 2017/11/13.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AssistQuestionDetailComponent } from './assist-question-detail/assist-question-detail.component';
import {AssistQuestionRoutingModule} from "./assist-question-routing.module";
import {AssistQuestionComponent} from "./assist-question.component";
import {MayihrPagingModule} from "../../../common/mayihr-paging/mayihr-paging.module";
import {BaseModule} from "../../../base.module";
import {MayihrPagingV2Module} from "../../../common/mayihr-paging-v2/mayihr-paging-v2.module";
@NgModule({
    imports: [
        CommonModule,
        MayihrPagingModule,
        BaseModule,
        AssistQuestionRoutingModule,
        MayihrPagingV2Module,
    ],
    declarations: [
        AssistQuestionDetailComponent,
        AssistQuestionComponent
    ]
})
export class AssistQuestionModule {
}