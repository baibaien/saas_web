import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StaffGeneralChangeService} from "../../../../../shared/service/staff-directory/staff-general-change/staff-general-change.service";
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-staff-personnal-change',
    templateUrl: './staff-personnal-change.component.html',
    styleUrls: ['./staff-personnal-change.component.css'],
    providers: [StaffGeneralChangeService]
})
export class StaffPersonnalChangeComponent implements OnInit {

    public hideDimission = true;
    public user_id;
    public yg_name;
    public yg_id;

    // -->修改转正入职日期
    public change_status;
    // <-----
    // -->
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emit;
    // <-----


    public personal_change = new FormControl('1');

    constructor(public activatedRoute: ActivatedRoute, public router: Router,
                public modalService: ModalService) {
        document.title = '人事变动';
        this.yg_id = this.activatedRoute.snapshot.params['user_id'].split(',');
        if (this.yg_id.length === 1) {
            this.user_id = this.activatedRoute.snapshot.params['user_id'];
        }
        this.yg_name = this.activatedRoute.snapshot.params['yg_name'];
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(data => {
            console.log(data);
            this.modal_name = data;
        });
    }

    ngOnInit() {
    }

    showGeneralChange(event) {
        if (!this.change_status.status) {
            this.hideDimission = true;
            this.personal_change.setValue('1');
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    showDimission(event) {
        if (!this.change_status.status) {
            this.personal_change.setValue('2');
            this.hideDimission = false;
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    getHireDateStatus(event) {
        console.log(event);
        this.change_status = event;
        // this.is_change_formal_date = event.date;
    }

    changeFormalDate() {
        this.modal_name = 'staff_general_formal_date_change_m';
        this.modal_info = Object.assign(this.change_status, {yg_id: this.user_id});
        this.modal_callback = () => {
            this.router.navigate([`/user/staff/staff-detail/${this.user_id}`]);
        };
    }
}
