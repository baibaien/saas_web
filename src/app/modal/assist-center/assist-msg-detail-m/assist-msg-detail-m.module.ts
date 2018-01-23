/**
 * Created by Bonan on 2017/11/3.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import { AssistMsgDetailMComponent } from './assist-msg-detail-m.component';
@NgModule({
    imports: [
        BaseModule,
        CommonModule
    ],
    declarations: [AssistMsgDetailMComponent],
    exports: [
        AssistMsgDetailMComponent
    ]
})
export class AssistMsgDetailMModule {}