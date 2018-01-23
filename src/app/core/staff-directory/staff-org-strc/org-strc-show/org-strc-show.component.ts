import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {isUndefined} from "util";

@Component({
    selector: 'app-org-strc-show',
    templateUrl: './org-strc-show.component.html',
    styleUrls: ['./org-strc-show.component.css']
})

export class OrgStrcShowComponent implements OnInit, OnDestroy {
    @Input()
    dept_now;

    public modal_name: string;
    public child_hide = true;

    constructor(public modalService: ModalService) {
    }


    ngOnInit() {
        // console.log(this.dept_now);
        if (isUndefined(this.dept_now)) {
            this.child_hide = false;
        }
    }
    ngOnDestroy() {
        this.modalService.setModalDate('');
    }
    orgEditModal(data) {
        this.modalService.setModalDate(data);
        this.modal_name = 'edit_modal';
        this.modalService.setModalName(this.modal_name);
        this.modalService.emitModalName();
    }

    // 显示子元素
    childShow() {
        this.child_hide = !this.child_hide;
        console.log(this.dept_now);
    }
}


