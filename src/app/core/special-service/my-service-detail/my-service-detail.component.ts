import {Component, EventEmitter, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {ActivatedRoute} from "@angular/router";
import {SpecialServiceApiService} from "../../../shared/service/api-service/special-service-api/special-service-api.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Headers} from "@angular/http";
import {DateService} from "../../../shared/service/date/date.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {isNull, isNullOrUndefined} from "util";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-my-service-detail',
    templateUrl: './my-service-detail.component.html',
    styleUrls: ['./my-service-detail.component.css']
})
export class MyServiceDetailComponent implements OnInit {


    // -->序号变量
    public no_str = '';
    // <-----
    // -->专项服务id
    public bill_id;
    // <-----

    public service_info;
    // -->基础信息
    public base_info;
    public status_name;
    public create_time;
    // <-----
    // -->快递单号表单
    public post_num;
    // <-----


    // -->收件地址列表
    public receive_address;
    public receive_form: FormGroup;
    public receive_info;
    // <-----
    // -->告知信息
    public inform_array: FormArray;
    public inform_info: FormGroup;
    // <-----

    // -->显示状态
    public show_state = {
        '1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false
    };
    // <-----
    // -->专项服务状态
    public service_status = false;
    // <-----


    // -->modal相关变量
    public modal_name;
    public modal_callback;
    public modal_name_emitter = new EventEmitter();
    // <-----
    constructor(public httpService: HttpService,
                public specialServiceApiService: SpecialServiceApiService,
                public activatedRoute: ActivatedRoute,
                public assistModalService: AssistModalService,
                public modalService: ModalService,
                public fb: FormBuilder,
                public dateService: DateService) {
        document.title = '服务详情';
        this.post_num = this.fb.group({
            type: ['4'],
            express_no: [''],
            remark: ['']
        });
        this.inform_info = this.fb.group({
            inform_array: this.fb.array([])
        });
        this.receive_form = this.fb.group({
            receive_list: ['']
        });
        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe((data) => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.bill_id = this.activatedRoute.snapshot.params['id'];
        this.requestInfo();
    }

    requestInfo() {
        this.httpService.myGet(this.specialServiceApiService.getServiceDetail(this.bill_id))
            .subscribe(data => {
                console.log(data);
                this.service_info = data.data.my_service;
                this.base_info = data.data.service;
                // -->基础信息赋值
                this.status_name = this.service_info.status_name;
                this.create_time = this.dateService.formatTimeStamp(Number(this.service_info.create_time));
                // <-----

                console.log(this.service_info);
                if (this.service_info.attr.hasOwnProperty('4') && this.service_info.attr['4']['title']) {
                    this.show_state['4'] = true;
                    console.log(this.show_state);
                }
                if (this.service_info.attr.hasOwnProperty('5') && this.service_info.attr['5']) {
                    if (this.service_info.attr['5'][0]['content']) {
                        this.show_state['5'] = true;
                    }
                    {
                        this.inform_info = this.fb.group({
                            inform_array: this.fb.array([])
                        });

                        const tmp_arr = this.inform_info.get('inform_array') as FormArray;
                        let counter = 0;
                        for (let i in this.service_info.attr['5']) {
                            const tmp_group = this.fb.group({
                                id: [this.service_info.attr['5'][i]['id']],
                                content: [this.service_info.attr['5'][i]['content'], Validators.required]
                            });
                            tmp_arr.push(tmp_group);
                            counter++;
                        }
                    }
                }
                console.log(this.service_info);

                if (this.service_info.attr.hasOwnProperty('8')) {
                    this.receive_address = data.data.address;
                    const tmp_data = data.data.contact;
                    if (data.data.contact.address_id != 0) {
                        this.show_state['8'] = true;
                    }
                    for (let i of this.receive_address) {
                        i.name = [i.contact, ...i.detail.split(/\&nbsp;/), i.mobile, i.post_code].filter(val => {
                            return !isNullOrUndefined(val) && val !== '';
                        }).join(',');
                        if (tmp_data.address_id != 0) {
                            if (i.id == tmp_data.address_id) {
                                this.receive_form.get('receive_list').setValue([{
                                    id: i.id,
                                    name: i.name
                                }]);
                                this.receive_info = i.name;
                            }
                        } else {
                            this.receive_form.get('receive_list').setValue('');
                        }
                    }

                }
                // -->序号处理内容
                this.no_str = '';
                for (let i in this.base_info.attr) {
                    if (i !== '1' && i !== '2' && i !== '8') {
                        this.no_str += i;
                    }
                }
                if (this.base_info.attr.hasOwnProperty('8')) {
                    this.no_str = '8' + this.no_str;
                }
                console.log(this.no_str);
                // <-----
                if (data.data.my_service.op_status == 3) {
                    for (let i in this.show_state) {
                        this.show_state[i] = true;
                    }
                    this.service_status = true;
                }
            });
    }


    /**
     * editReceiveAddr
     * 函数描述
     * 编辑接收地址
     * @params:
     * @return:
     */
    editReceiveAddr() {
        this.show_state['8'] = false;
    }

    /**
     * addNewAddress
     * 函数描述
     * 添加新的收件地址
     * @params:
     * @return:
     */
    addNewAddress() {
        this.modal_name = 'send_setting_m';
        this.modal_callback = () => {
            this.httpService.myGet(this.specialServiceApiService.getServiceDetail(this.bill_id))
                .subscribe(data => {
                    this.receive_address = data.data.address;
                    const tmp_data = data.data.contact;
                    for (let i of this.receive_address) {
                        i.name = [i.contact, ...i.detail.split(/\&nbsp;/), i.mobile, i.post_code].filter(val => {
                            return !isNullOrUndefined(val) && val !== '';
                        }).join(',');
                        if (tmp_data.address_id != 0) {
                            if (i.id == tmp_data.address_id) {
                                this.receive_form.get('receive_list').setValue([{
                                    id: i.id,
                                    name: i.name
                                }]);
                                this.receive_info = i.name;
                            }
                        } else {
                            this.receive_form.get('receive_list').setValue('');
                        }
                    }
                })
        };
    }

    /**
     * submitAddress
     * 函数描述
     * 提交收件地址
     * @params:
     * @return:
     */
    submitAddress() {
        console.log(this.receive_form.get('receive_list').value[0].id);
        this.httpService.myPost(this.specialServiceApiService.getPostNum(this.service_info.attr['8']['id']),
            {
                address_id: this.receive_form.get('receive_list').value[0].id,
                type: 8
            })
            .subscribe(data => {
                console.log(data);
                this.requestInfo();
                this.show_state['8'] = false;
            });

    }

    // -->提交快递单号表单
    editPostNum() {
        this.post_num.get('express_no').setValue(this.service_info.attr['4']['title']);
        this.post_num.get('remark').setValue(this.service_info.attr['4']['content']);
        this.show_state['4'] = false;
    }

    submitPostNum() {
        console.log(this.post_num.value);
        this.httpService.myPost(this.specialServiceApiService.getPostNum(this.service_info.attr['4']['id']), this.post_num.value)
            .subscribe(data => {
                this.requestInfo();
            });

    }

    // <-----


    // -->下载相应材料
    downloadFile(file) {
        console.log(file);
        console.log(file.content);
        // const token = window.localStorage.getItem('mayihr_token');
        window.open(`${file.content}`);
    }

    // <-----


    // -->提交告知信息
    submitInform() {
        console.log(this.inform_info.value);
        let tmp_data = {
            type: '5',
            content: []
        };
        console.log(this.inform_info.value);
        for (let i in this.inform_info.value.inform_array) {
            console.log(this.inform_info.value[i]);
            tmp_data.content.push(this.inform_info.value.inform_array[i]);
        }
        console.log(tmp_data);
        this.httpService.myPost(this.specialServiceApiService.getInformInfo(), tmp_data)
            .subscribe(data => {
                console.log(data);
                this.show_state['5'] = true;
                this.requestInfo();
            });
    }

    editInformInfo() {
        console.log(this.inform_info);
        this.show_state['5'] = false;
        // for (let i in this.service_info.attr['5']) {
        // }
        this.service_info.attr['5'].map((value, index) => {
            this.inform_info.get('inform_array').get(`${index}`).get('content').setValue(value.content);
        });
        console.log(this.inform_info);
    }

    // <-----

    // -->上传材料
    uploadMaterial(index) {
        document.getElementById(`${index}`).click();
    }

    getUploadMaterial(event, info) {
        console.log(info);
        if (event.target.files.length > 0) {
            const temp_data = event.target.files[0];
            const form_data = new FormData();
            form_data.append('file', temp_data);
            form_data.append('id', info.id);
            form_data.append('pay_id', info.pay_id);
            const header = new Headers();
            header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
            this.httpService.myPost(this.specialServiceApiService.getMaterialImg(), form_data, {headers: header})
                .subscribe(data => {
                    this.requestInfo();
                    // event.target.files[0] = '';
                });
        }
    }


    downloadUploadedMaterial(info) {
        console.log(info);
        window.open(info.content);
    }

    assureReceive(attr) {
        console.log(attr);
        this.httpService.myPost(this.specialServiceApiService.getAssureReceive(attr.id), {})
            .subscribe(data => {
                this.assistModalService.openAssistModal('toast', '签收成功', () => {
                    attr.is_receive = 1;
                });
            });
    }

    // <-----
    closeModal(data) {
        console.log(data);
        this.show_state[data] = true;
        console.log(this.show_state);

    }
}
