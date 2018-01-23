import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {UsersService} from "../../../../shared/service/api-service/users/users.service";
import {LoginService} from "../../../../shared/service/login/login.service";

@Component({
    selector: 'app-staff-self-m',
    templateUrl: './staff-self-m.component.html',
    styleUrls: ['./staff-self-m.component.css']
})
export class StaffSelfMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Output()
    modal_result = new EventEmitter();

    public is_hide_again;

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public usersService: UsersService,
                public loginService: LoginService) {
    }

    ngOnInit() {
        console.log(this.modal_info);
    }

    deleteRecord() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    isShowAgain() {
        this.is_hide_again = !this.is_hide_again;
    }

    cancelModal() {
        this.modal_result.emit({
            modal_name: 'staff_self',
            result: 0
        });
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        this.modal_result.emit({
            modal_name: 'staff_self',
            result: 1
        });
        if (this.is_hide_again) {
            this.httpService.myGet(this.usersService.getSetModalHide(), {search: {name: 'user_self_help'}})
                .subscribe(data => {
                    console.log(data);
                    this.loginService.checkModalSetting();
                });
        }
        console.log(this.is_hide_again);
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
