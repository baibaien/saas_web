import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AssistModalModule} from "./assist-modal/assist-modal.module";
import {PipeModule} from "./shared/pipe/pipe.module";
import {MayihrSelectModule} from "./common/mayihr-select/mayihr-select.module";

@NgModule({
  imports: [
      FormsModule,
      HttpModule,
      ReactiveFormsModule,
      AssistModalModule,
      PipeModule,
      MayihrSelectModule,
  ],
  exports: [
      FormsModule,
      HttpModule,
      ReactiveFormsModule,
      AssistModalModule,
      PipeModule,
      MayihrSelectModule
  ],
  declarations: []
})
export class BaseModule { }
