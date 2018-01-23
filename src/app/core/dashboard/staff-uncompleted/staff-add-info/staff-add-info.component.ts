import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {DashboardApiService} from "../../../../shared/service/api-service/dashboard-api/dashboard-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {StaffsService} from "../../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {ImgService} from "../../../../shared/service/common-service/img-service/img.service";
import {objToArr} from "../../../../shared/function/type-operate";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
@Component({
    selector: 'app-staff-add-info',
    templateUrl: './staff-add-info.component.html',
    styleUrls: ['./staff-add-info.component.less']
})
export class StaffAddInfoComponent implements OnInit {
    public yg_id;
    public yg_name;


    public out_status;

    public only_bank;

    public info_data;

    public add_form;

    // -->
    public post_list;
    // <-----

    // -->bank信息
    public bank_parent_config = {
        placeholder: '请选择开户行',
        allow_clear: true,
        async: false
    };
    public bank_child_config = {
        placeholder: '请选择支行',
        allow_clear: true,
        async: true
    };
    public bank_list;
    public sub_bank_list;
    public sub_banks_async;

    public banks_page = 1;
    public bank_id;
    public bank_name;
    // <-----

    public social_status = new FormControl('');
    public fund_status = new FormControl('');


    public modal_name;
    public modal_info;
    public modal_callback;
    // -->是否有银行
    public show_bank = false;
    // <-----

    // -->是否有手动填写信息
    public show_info = false;
    // <-----
    constructor(public httpService: HttpService,
                public activatedRoute: ActivatedRoute,
                public dashboardApiService: DashboardApiService,
                public staffsService: StaffsService,
                public router: Router,
                public imgService: ImgService,
                public assistModalService: AssistModalService,
                public fb: FormBuilder) {
        document.title = '补全信息';
        this.yg_id = this.activatedRoute.snapshot.params['id'];
        this.out_status = this.activatedRoute.snapshot.params['status'] === 'outsource';
        // this.clearLocalStorage();
        this.httpService.myPost(this.staffsService.getYgBank(), {})
            .subscribe(
                data => {
                    this.bank_list = data.data.data.map((val) => {
                        val['name'] = val['bank_name'];
                        val['id'] = val['bank_id'];
                        return val;
                    });
                });
    }

    ngOnInit() {
        this.httpService.myGet(this.dashboardApiService.getStaffAddInfo(), {search: {yg_id: this.yg_id}})
            .subscribe(data => {
                this.yg_name = data.data.info.yg_name;
                document.title = `补全信息: ${this.yg_name}`;
                this.info_data = data.data;
                this.social_status.setValue(this.info_data.info.social_status);
                this.fund_status.setValue(this.info_data.info.fund_status);
                this.add_form = this.dataToForm(this.info_data);
                this.info_data['default_upload'] = objToArr(this.info_data.default_upload);
                this.info_data['upload'] = objToArr(this.info_data.upload);
                this.info_data['download'] = objToArr(this.info_data.download);
                console.log(this.info_data);
            });
    }

    /**
     * dataToForm
     * 函数描述
     * 数据动态生成表单
     * @params: input
     * @return: form
     */
    dataToForm(data) {
        const select_arr = ['yg_nation', 'yg_xueli'];
        const result_form = this.fb.group({});

        // -->
        // <-----

        this.post_list = Object.keys(data.post);
        console.log(this.post_list);


        // -->银行数据处理
        result_form.addControl('yg_bank_acc', new FormControl(data.info.yg_bank_acc));
        result_form.addControl('bank_code', new FormControl([{
            id: data.info.bank_code, name: data.info.bank_name
        }]));
        if (data.info.bank_name != '' && data.info.bank_sub_name == '') {
            this.refreshParentBank({id: data.info.bank_code, name: data.info.bank_name});
        }
        result_form.addControl('bank_sub_code', new FormControl([{
            id: data.info.bank_sub_code, name: data.info.bank_sub_name
        }]));

        // <-----

        // // -->外包状态
        // if (this.out_status) {
        //     result_form.addControl('yg_social_acc', new FormControl(data.info.yg_social_acc));
        //     result_form.addControl('yg_fund_acc', new FormControl(data.info.yg_fund_acc));
        // }
        // // <-----


        // -->其他数据
        Object.keys(data.item).map((val, index, arr) => {
            if ((val === 'bank_code' && arr.length == 3) ||  (val === 'bank_code' && arr.length == 4 && (arr.indexOf('hr_yg_hospital') != -1))) {
                this.show_info = false;
            }
            if (select_arr.indexOf(val) !== -1) {
                if (data.info[val] == 0) {
                    result_form.addControl(val, new FormControl(''));
                } else {
                    for (let i of data.setting[val]) {
                        if (data.info[val] == i.id) {
                            result_form.addControl(val, new FormControl([i]));
                        }
                    }
                }
            } else {
                console.log(val);
                if (val.indexOf('post') != -1) {
                    result_form.addControl(val, new FormControl(data.info[val], [Validators.minLength(6), Validators.maxLength(6)]));
                } else {
                    result_form.addControl(val, new FormControl(data.info[val]));
                }
            }
        });
        // <-----
        console.log(result_form);
        return result_form;
    }

    //
    // clearLocalStorage() {
    //     const sf_local_storage = ['sf00', 'sf01', 'sf10', 'sf11'];
    //     for (let i in sf_local_storage) {
    //         if (isNullOrUndefined(sf_local_storage[i])) {
    //             window.localStorage.removeItem(sf_local_storage[i]);
    //         }
    //     }
    // }
    //

    /**
     * refreshParentBank
     * 函数描述
     *
     * @params:
     * @return:
     */
    refreshParentBank(value) {
        console.log(value);
        this.banks_page = 1;
        if (value.id) {
            this.bank_id = value.id;
            this.bank_name = value.name;
        }
        this.httpService.myPost(this.staffsService.getYgOpenBank(), {
            name: '',
            bank_id: this.bank_id = value.id,
            page: this.banks_page
        }).subscribe((res) => {
            this.add_form.get('bank_sub_code').setValue('');
            this.sub_bank_list = [];
            res.data.data.map((item) => {
                this.sub_bank_list.push({
                    id: item.bank_code,
                    name: item.bank_name
                });
            });
        });
    }

    refreshAsyncParent(value) {
        console.log(this.add_form.get('bank_code').value[0].id);
        if (value.waterfall) {
            this.banks_page++;
            this.httpService.myPost(this.staffsService.getYgOpenBank(), {
                name: value.search,
                bank_id: this.add_form.get('bank_code').value[0].id,
                page: this.banks_page
            }).subscribe((res) => {
                const tmp_arr = [];
                res.data.data.map((item) => {
                    tmp_arr.push({
                        id: item.bank_code,
                        name: item.bank_name
                    });
                });
                this.sub_banks_async = tmp_arr;
            });
        } else {
            this.banks_page = 1;
            this.httpService.myPost(this.staffsService.getYgOpenBank(), {
                name: value.search,
                bank_id: this.add_form.get('bank_code').value[0].id,
                page: this.banks_page
            }).subscribe((res) => {
                const tmp_arr = [];
                res.data.data.map((item) => {
                    tmp_arr.push({
                        id: item.bank_code,
                        name: item.bank_name
                    });
                });
                this.sub_bank_list = tmp_arr;
            });
        }
    }


    /**
     * uploadImage
     * 函数描述
     *
     * @params:
     * @return:
     */
    uploadImage(event, item) {
        console.log(event);
        console.log(item);
        this.imgService.createImgUpObservable(event, item.type_id, this.staffsService.uploadYgPics(), this.yg_id)
            .subscribe(data => {
                console.log(data);
                item.url = data.data.url;
                item.img_id = data.data.id;
            });
    }

    /**
     * deleteImage
     * 函数描述
     *
     * @params:
     * @return:
     */
    deleteImage(event, item) {
        console.log(item);
        this.httpService.myDelete(`${this.staffsService.deleteYgpic()}/${item.img_id}`)
            .subscribe(data => {
                console.log(data);
                item.url = '';
                this.assistModalService.openAssistModal('toast', '删除成功');
            });
    }

    downloadMaterial(item) {
        window.open(item.url);
    }

    /**
     * saveSocialStatus
     * 函数描述
     * 保存社保状态
     * @params:
     * @return:
     */
    saveSocialStatus() {
        setTimeout(() => {
            console.log(this.social_status.value);
            console.log(this.fund_status.value);
            this.httpService.myPost(this.dashboardApiService.getStoreSocialStatus(), {
                social_status: Number(this.social_status.value),
                fund_status: Number(this.fund_status.value),
                yg_id: this.yg_id
            }).subscribe(data => {
                this.ngOnInit();
            });
        });

    }

    /**
     * saveUpadate
     * 函数描述
     * 保存更新
     * @params:
     * @return:
     */
    saveUpadate() {
        const submit_data = this.add_form.value;
        for (let i in submit_data) {
            if (submit_data[i] instanceof Array) {
                submit_data[i] = submit_data[i][0].id;
            }
        }
        submit_data['yg_id'] = this.yg_id;
        this.httpService.myPost(this.dashboardApiService.getAddInfoStore(), submit_data)
            .subscribe(data => {
                console.log(data);
                this.cancelUpadate();
            });
    }

    cancelUpadate() {
        this.router.navigate(['/user/dashboard/staff-uncompleted']);
    }


    /**
     * openHospital
     * 函数描述
     * 打开定点医院modal
     * @params:
     * @return:
     */
    openHospital() {
        console.log(this.yg_id);
        this.modal_name = 'hospital';
        this.modal_info = [this.yg_id, this.info_data.hr_yg_hospital];
    }

    hideModal(event) {
        console.log(event);
        if (event) {
            this.modal_name = '';
        } else {
            this.modal_name = 'hospital';
        }
    }

    confirmModal(event) {
        console.log(event);
        this.info_data.hr_yg_hospital = JSON.parse(JSON.stringify(event.args));
    }
}
