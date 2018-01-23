import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StaffDetailService} from "../../../../../shared/service/staff-directory/staff-detail/staff-detail.service";
import {AssistModalService} from "../../../../../shared/service/assist-modal-service/assist-modal.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {StaffsService} from "../../../../../shared/service/api-service/staff-directory/staffs/staffs.service";

@Component({
    selector: 'app-labour-contract',
    templateUrl: './labour-contract.component.html',
    styleUrls: ['./labour-contract.component.css']
})
export class LabourContractComponent implements OnInit {
    // @ViewChild('modal') modal: ElementRef;
    public labour_contract: FormGroup;
    public beforesubmit = true;
    public yg_id;
    public end_time_options;
    @Output() hide: EventEmitter<boolean> = new EventEmitter();
    @Output() confirm: EventEmitter<object> = new EventEmitter();
    @Input() modal_args: Array<any>;


    // -->合同起始日期
    public in_at;
    // <-----

    constructor(fb: FormBuilder, public staffDetailService: StaffDetailService,
                public staffsService: StaffsService,
                public httpService: HttpService,
                public assistModalService: AssistModalService) {
        this.labour_contract = fb.group({
            code: ['', Validators.required],
            in_at: ['', Validators.required],
            out_at: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.yg_id = this.modal_args[0];
        this.httpService.myGet(this.staffsService.getYgContractCreate(), {search: {yg_id: this.yg_id}})
            .subscribe(data => {
                console.log(data);
                this.in_at = data.data.in_at;
                this.labour_contract.get('in_at').setValue(this.in_at);
                this.end_time_options = {
                    start_time: this.in_at,
                    start_time_type: 0
                };
            });
    }

    setEndTime(option_obj, event) {
        this[option_obj] = Object.assign(JSON.parse(JSON.stringify(this[option_obj])), {start_time: event, start_time_type: 0});
    }

    cancelModal() {
        this.hide.emit(true);
        this.labour_contract.reset('');
    }

    createContract() {
        this.beforesubmit = false;
        let submit_data: Object = {};
        submit_data['yg_id'] = this.yg_id;
        if (this.labour_contract.valid) {
            for (let obj in this.labour_contract.value) {
                submit_data[obj] = this.labour_contract.value[obj];
            }
            this.beforesubmit = true;
            this.staffDetailService.addContract(submit_data).subscribe((res) => {
                this.assistModalService.openAssistModal('toast', '生成成功', () => {
                    this.confirm.emit({func_name: 'addNewContract', args: res.data.data});
                });
            });
        }

        // this.hide.emit(true);
    }
}
