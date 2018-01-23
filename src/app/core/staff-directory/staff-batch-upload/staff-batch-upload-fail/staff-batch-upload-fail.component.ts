import {Component, OnInit} from '@angular/core';
import {StaffsService} from '../../../../shared/service/api-service/staff-directory/staffs/staffs.service';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StaffUploadService} from '../../../../shared/service/staff-directory/staff-upload/staff-upload.service';
import {HttpService} from '../../../../shared/service/http-service/http.service';
import {RequestOptions, Headers} from "@angular/http";

@Component({
    selector: 'app-staff-batch-upload-fail',
    templateUrl: './staff-batch-upload-fail.component.html',
    styleUrls: ['./staff-batch-upload-fail.component.css']
})
export class StaffBatchUploadFailComponent implements OnInit {
    public modal_info;
    public modal_obj;
    public modal_name_emit;
    public init_data = {};


    public show_excel = false;

    constructor(public httpService: HttpService,
                public staffsService: StaffsService,
                public router: Router,
                public modalService: ModalService,
                public activatedRoute: ActivatedRoute,
                public staffUploadService: StaffUploadService) {
        document.title = '批量导入异常';
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            console.log(res.error_info_url);
            this.init_data['error_info_url'] = res.error_info_url;
            this.init_data['failure_count'] = res.failure_count;
            this.init_data['success_count'] = res.success_count;
        });
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(res => {
            this.modal_info = res;
        });
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
        header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`)
        this.httpService.myPost(this.staffsService.uploadYgsExcel(), form_data, {headers: header})
            .subscribe(res => {
                if (res.data.failure_count == 0 && res.data.success_count != 0) {
                    this.modal_info = 'modal_info';
                    this.modal_obj = {type: 'pop', data: '批量添加员工成功'};
                    let timer = null;
                    timer = window.setTimeout(() => {
                        this.router.navigate(['/user/staff']);
                        timer = null;
                        window.clearTimeout(timer);
                    }, 800);
                } else if (res.data.failure_count == 0 && res.data.success_count == 0) {
                    this.modal_info = 'modal_info';
                    this.modal_obj = {type: 'info', data: '上传表格有效信息为空，请重新上传'};
                } else {
                    this.router.navigate(['/user/staff/staff-batch-upload/result', {
                        error_info_url: res.data.error_info_url,
                        failure_count: res.data.failure_count,
                        success_count: res.data.success_count
                    }]);
                    console.log(document.getElementById('file'));
                    // document.getElementById('file').innerHTML= '';
                }
                this.show_excel = !this.show_excel;
            });
    }

    downErrorExcel() {
        window.open(`${this.init_data['error_info_url']}?token=${window.localStorage.getItem('mayihr_token')}`);
    }

    saveExcel() {
        this.staffUploadService.saveYgsExcel().subscribe((res) => {
            this.router.navigate(['/user/staff']);
        });
    }

    gaveupExcel() {
        this.staffUploadService.gaveupExcel().subscribe((res) => {
            this.router.navigate(['/user/staff/staff-batch-upload']);
        });
    }
}
