import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-salary-status',
    templateUrl: './salary-status.component.html',
    styleUrls: ['./salary-status.component.css']
})
export class SalaryStatusComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    isLock;

    public view_text = '';

    constructor(public modalService: ModalService,
                public router: Router) {
    }

    ngOnInit() {

        if (this.isLock == 0) {
            this.view_text = '如需更新工资表，请前往计算薪资页面重新计算';
        } else if (this.isLock == 1) {
            this.view_text = '对应月份工资表已经归档，将不能体现本条记录';
        }
    }

    // 关闭模态框
    cancelModal(type?) {
        if (type == 1) {
            this.router.navigate(['/user/salary-calc']);
        } else if (type == 2) {
            
        }
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
