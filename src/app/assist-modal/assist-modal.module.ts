import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalInfoComponent} from "./modal/modal-info/modal-info.component";
import {ModalNoticeComponent} from "./modal-notice/modal-notice.component";
import { ToastComponent } from './toast/toast.component';
import { AssistModalComponent } from './assist-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      ModalInfoComponent,
      ModalNoticeComponent,
      ToastComponent,
      AssistModalComponent,
      AlertModalComponent,
      ConfirmModalComponent
  ],
  exports: [
      ModalInfoComponent,
      ModalNoticeComponent,
      AssistModalComponent
  ]
})
export class AssistModalModule { }
