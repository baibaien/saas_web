import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {requireDeci, requireNum} from '../../../../../shared/validators/staff-upload-validator';
import {StaffDetailService} from '../../../../../shared/service/staff-directory/staff-detail/staff-detail.service';

@Component({
    selector: 'app-staff-qualified',
    templateUrl: './staff-qualified.component.html',
    styleUrls: ['./staff-qualified.component.css']
})
export class StaffQualifiedComponent implements OnInit, OnChanges {
    @Output() hide: EventEmitter<boolean> = new EventEmitter();
    @Output() confirm: EventEmitter<Object> = new EventEmitter();
    @Input() modal_args: Array<any>;
    public be_qualified: FormGroup;
    public be_qualified_submit = true;
    public yg_id;


    constructor(public fb: FormBuilder, public staffDetailService: StaffDetailService) {


    }
    ngOnInit() {

    }
    ngOnChanges() {
        console.log(this.modal_args);
        this.be_qualified = this.fb.group({
            yg_formal_date: [this.modal_args[1], [Validators.required]],
            // yg_sallay: [this.modal_args[2], [Validators.required, requireDeci]]
        });
        console.log(this.modal_args);
        this.yg_id = this.modal_args[0];
    }

    cancelModal() {
        this.be_qualified.reset('');
        this.hide.emit(true);
    }

    saveMsg() {
        if (this.be_qualified.valid) {
            this.be_qualified_submit = true;
            const qualified_value = {};
            console.log(qualified_value);
            qualified_value['effective_at'] = this.be_qualified.value.yg_formal_date;
            // qualified_value['yg_sallay'] = this.be_qualified.value.yg_sallay;
            qualified_value['yg_id'] = this.yg_id;
            this.staffDetailService.getYgQualified(qualified_value).subscribe((res) => {
                console.log(res);
                this.hide.emit(true);
                this.be_qualified.reset('');
                this.confirm.emit({func_name: 'init'});
            });
        } else {
            this.be_qualified_submit = false;
        }
    }

}
