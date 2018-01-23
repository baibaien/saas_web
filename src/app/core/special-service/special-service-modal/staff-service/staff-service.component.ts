import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {isUndefined} from "util";
import {StaffOutlineService} from "../../../../shared/service/staff-attendance/staff-outline/staff-outline.service";
import {SpecialServiceApiService} from "../../../../shared/service/api-service/special-service-api/special-service-api.service";
import {FormControl} from "@angular/forms";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {Router} from "@angular/router";
import {StaffsService} from "../../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-staff-service',
    templateUrl: './staff-service.component.html',
    styleUrls: ['./staff-service.component.css']
})
export class StaffServiceComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    // -->员工名录
    public staff_outline = [];
    // <-----
    public staff = new FormControl('');

    constructor(public modalService: ModalService,
                public staffOutlineService: StaffOutlineService,
                public specialServiceApiService: SpecialServiceApiService,
                public assistModalService: AssistModalService,
                public router: Router,
                public httpService: HttpService) {
    }

    ngOnInit() {
        this.httpService.myGet(this.specialServiceApiService.getLocalStaffService(), {search: {city_id: this.modal_info[0]}})
            .subscribe(data => {
                console.log('专项服务',data);
                this.staff_outline = this.staffOutlineService.compileData(data.data);
            });
    }

    // -->select选中后回调
    refreshValue(event) {

    }

    // <-----
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        let submit_data = {};
        if (this.staff.value === '' || this.staff.value.length === 0) {
            submit_data['yg_id'] = 0;
        } else {
            submit_data['yg_id'] = this.staff.value[0].id;
        }
        submit_data['city_id'] = this.modal_info[0];
        submit_data['id'] = this.modal_info[1];

        this.httpService.myPost(this.specialServiceApiService.getPayService(), submit_data)
            .subscribe(data => {
                this.modalService.setModalName('');
                this.modalService.emitModalName();
                this.assistModalService.openAssistModal('toast', '专项服务办理成功', () => {
                    this.router.navigate(['/user/bill-manage']);
                });
            }, error => {
                this.modalService.setModalName('');
                this.modalService.emitModalName();
            });
    }
}
