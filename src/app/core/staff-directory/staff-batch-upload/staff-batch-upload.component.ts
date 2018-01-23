import {Component, OnDestroy, OnInit} from '@angular/core';
import {StaffsService} from '../../../shared/service/api-service/staff-directory/staffs/staffs.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../shared/service/modal/modal.service';
import {HttpService} from '../../../shared/service/http-service/http.service';
import {RequestOptions, Headers} from "@angular/http";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";


@Component({
    selector: 'app-staff-batch-upload',
    templateUrl: './staff-batch-upload.component.html',
    styleUrls: ['./staff-batch-upload.component.css']
})
export class StaffBatchUploadComponent implements OnInit, OnDestroy {
    public modal_info;
    public modal_obj;
    public modal_name_emit;

    public test = true;

    constructor(public httpService: HttpService,
                public staffsService: StaffsService,
                public router: Router,
                public assistModalService: AssistModalService,
                public modalService: ModalService) {
        document.title = '批量导入';
    }

    ngOnInit() {
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(res => {
            this.modal_info = res;
        });
    }

    ngOnDestroy() {
        this.modal_name_emit.unsubscribe();
    }


    invokeUpload() {
        document.getElementById('input').click();
    }
    resetForm(event) {
        console.log(event);
        event.reset();
    }
    // 上传excel
    uploadExcel(event: any) {
        if (event.target.files.length > 0) {
            let temp_data = event.target.files[0];
            let form_data = new FormData();
            form_data.append('file', temp_data);
            this.Foo(form_data);
        }
    }

    Foo(form_data) {
        let header = new Headers();
        header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
        this.httpService.myPost(this.staffsService.uploadYgsExcel(), form_data, {headers: header})
            .subscribe(res => {
                if (res.data.failure_count == 0 && res.data.success_count != 0) {
                    this.assistModalService.openAssistModal('toast', '批量添加员工成功', () => {
                        this.router.navigate(['/user/staff']);
                    });
                } else if (res.data.failure_count == 0 && res.data.success_count == 0) {
                    this.assistModalService.openAssistModal('alert', '上传表格有效信息为空，请重新上传');
                } else {
                    this.router.navigate(['/user/staff/staff-batch-upload/result', {
                        error_info_url: res.data.error_info_url,
                        failure_count: res.data.failure_count,
                        success_count: res.data.success_count
                    }]);
                }
                this.test = false;
                setTimeout(() => {
                    this.test = true;
                });
            });
    }

    downloadExcel() {
        window.open(`${this.staffsService.downloadExcel()}?token=${window.localStorage.getItem('mayihr_token')}`);
    }
}
