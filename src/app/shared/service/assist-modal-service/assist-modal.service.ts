import {Injectable} from '@angular/core';
import {AssistModalComponent} from "../../../assist-modal/assist-modal.component";

@Injectable()
export class AssistModalService {
    public static modal: AssistModalComponent;

    constructor() {
    }

    openAssistModal(name, info?, handler?) {
        AssistModalService.modal.openAssistModal(name, info, handler);
    }

    closeAssistModal() {
        AssistModalService.modal.closeAssistModal();
    }
}