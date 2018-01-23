import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AttendanceService} from '../../../../shared/service/api-service/staff-attendance/attendance/attendance.service';
import {Observable} from 'rxjs/Observable';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {GlobalFuncService} from '../../../../shared/service/global-func/global-func.service';
import {DateService} from '../../../../shared/service/date/date.service';
import {HttpService} from '../../../../shared/service/http-service/http.service';
import {mixHour} from '../../../../shared/validators/time-validator';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-holiday-extend-m',
    templateUrl: './holiday-extend-m.component.html',
    styleUrls: ['./holiday-extend-m.component.css']
})
export class HolidayExtendMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    public yg_id_params = '';
    public holiday_extend;
    public staffs_id;
    public url_info;
    // post流
    public extendHolidaySource: Observable<any>;
    // -->提交状态校验
    public before_submit = false;
    // <-----

    public date_now;
    constructor(public modalService: ModalService,
                public fb: FormBuilder,
                public httpService: HttpService,
                public attendanceService: AttendanceService,
                public globalFuncService: GlobalFuncService,
                public assistModalService: AssistModalService,
                public dateService: DateService) {
        this.date_now = this.dateService.getDateNow();
        console.log(this.date_now);
        this.holiday_extend = this.fb.group({
            duration: ['', [mixHour, Validators.required]],
            expire_time: [this.dateService.getDateNow('day', -1)],
            show_unit: ['1']
        });
    }

    ngOnInit() {
        this.staffs_id = this.modal_info.staffs_id;
        this.url_info = this.modal_info.url_info;
        this.yg_id_params = this.staffs_id.join(',');
        console.log(this.modal_info);
    }


    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    createExtend() {
        this.before_submit = true;
        if (this.holiday_extend.valid) {
            this.before_submit = false;
            this.holiday_extend.value['yg_id'] = this.yg_id_params;
            this.holiday_extend.value['show_unit'] = '2';
            // type_id硬编码
            this.holiday_extend.value['type_id'] = 12;
            this.extendHolidaySource = this.httpService.myPost(this.attendanceService.getStaffHoliday(), JSON.stringify(this.holiday_extend.value));
            this.extendHolidaySource.subscribe((data) => {
                this.assistModalService.openAssistModal('toast', '添加成功');
                    this.globalFuncService.setInfoListSource('post', this.url_info, {});
                    this.globalFuncService.emitInfoListSource();
                });
        }
    }
}
