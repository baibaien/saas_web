import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
    contactValid,
    fundBase, idValid, LegalRange, requireDeci, socialBase,
    socialValid, trySallaryValid
} from "../../../../../shared/validators/staff-upload-validator";
import {StaffUploadService} from "../../../../../shared/service/staff-directory/staff-upload/staff-upload.service";
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {AssistModalService} from "../../../../../shared/service/assist-modal-service/assist-modal.service";
import {DateService} from "../../../../../shared/service/date/date.service";
import {isUndefined} from "util";
import {StaffDetailService} from "../../../../../shared/service/staff-directory/staff-detail/staff-detail.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {StaffsService} from "../../../../../shared/service/api-service/staff-directory/staffs/staffs.service";

@Component({
    selector: 'app-staff-rehire',
    templateUrl: './staff-rehire.component.html',
    styleUrls: ['./staff-rehire.component.css']
})
export class StaffRehireComponent implements OnInit, AfterViewInit, OnDestroy {

    // -->页面导航节点
    @ViewChild('workInfo') tabFirst: ElementRef;
    @ViewChild('salary') tabSecond: ElementRef;
    @ViewChild('social_security') tabThird: ElementRef;
    @ViewChild('staff_self') tabFourth: ElementRef;
    @ViewChild('rollingNav') nav: ElementRef;


    public tabData: Array<TabType> = [
        {title: '工作信息', target: this.tabFirst},
        {title: '薪酬信息', target: this.tabSecond},
        {title: '社保公积金', target: this.tabThird},
        {title: '员工自助', target: this.tabFourth}
    ];
    public scrollListen;
    public first_light = true;
    // <-----


    // -->路由守卫
    public show_guard = true;
    // <-----


    // -->整表单
    public add_yg: FormGroup;

    public before_submit = true;
    // <-----


    // -->日历插件配置
    public yg_formal_date = {
        min_view_mode: 2,
        start_time_type: 1
    };
    // <-----

    // public date_pre;
    // public date_now;


    // -->社保基数设置
    public base_range = {
        social_low: 0,
        social_high: 0,
        fund_low: 0,
        fund_high: 0
    };
    public social_low_base;
    public fund_low_base;

    public social_placeholder = '填写缴纳基数';
    public fund_placeholder = '填写缴纳基数';
    // <-----


    // public selectFullTime = true;
    // public yg_self_state = true;


    // -->福利操作
    public is_add_benifit = true;
    public benifit_chosen: Array<any> = [];
    // <-----
    // public same_benifit = false;


    // -->后台数据
    public upload_yg_settings;
    public upload_yg_default;
    public social_base_settings;
    public social_city_settings;

    // <-----

    // public cities: Array<any> = [];
    // public yg_id;
    // public city_id;

    // -->社保规则
    public social_rule;
    // <-----

    public position_lists = [];
    public search_position_lists = [];
    public add_new_position = false;
    public position_search: FormControl = new FormControl();
    // public city_first = new FormControl();
    public show_search_bar = false;
    public benifits_name: Array<string> = [];
    public add_new_succes = false;


    // -->modal相关
    public modal_name;
    public modal_name_emit;
    public modal_info;
    public modal_callback;
    // <-----


    public error_msg = {};


    public position_select_config;


    // -->城市列表操作
    public province_list = [];
    public city_list = [];
    public direction_list = [];
    // <-----

    // -->
    public user_id;
    public yg_name;
    // <-----
    public data_over;
    public staff_work_info;
    public staff_salary_info;
    public staff_social_rule;
    public staff_self_info;


    // -->
    public area_list = {
        province_list: [],
        direction_list: [],
        city_list: []
    };
    // <-----

    public hire_tips;

    constructor(public fb: FormBuilder,
                public router: Router,
                public activatedRoute: ActivatedRoute,
                public modalService: ModalService,
                public renderer2: Renderer2,
                public httpService: HttpService,
                public staffsService: StaffsService,
                public staffUploadService: StaffUploadService,
                public assistModalService: AssistModalService,
                public dateService: DateService) {
        document.title = '重新雇佣';
        // -->岗位下拉框config
        this.position_select_config = {
            placeholder: '请选择岗位',
            allow_clear: true,
            href_text: '添加新岗位',
            href: () => {
                this.modal_name = 'staff_upload_position_update';
                this.modal_callback = (new_position) => {
                    this.position_lists.push(new_position);
                };
            }
        };
        // <-----

        this.resetForm();
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }


    ngOnInit() {
        this.user_id = this.activatedRoute.snapshot.params['user_id']; // yg_id
        // 员工详情页基本配置
        this.staffUploadService.addStaffSettings().subscribe((res) => {
            console.log(res);
            this.upload_yg_settings = res.data.settings;
            this.upload_yg_default = res.data.default;

            // -->福利处理部分
            for (let i = 0; i < this.upload_yg_default.benifits.length; i++) {
                for (let j = 0; j < this.upload_yg_settings.hr_gs_benifit.length; j++) {
                    if (this.upload_yg_default.benifits[i] == this.upload_yg_settings.hr_gs_benifit[j].id) {
                        let name = this.upload_yg_settings.hr_gs_benifit[j]['name'];
                        let money = this.upload_yg_settings.hr_gs_benifit[j]['money'];
                        let target_value = this.upload_yg_settings.hr_gs_benifit[j]['id'];
                        this.benifits_name.push(name);
                        let form_group = new FormBuilder().group({
                            be_id: [target_value],
                            money: [money]
                        });
                        this.benifit_chosen.push(target_value);
                        this.upload_yg_settings.hr_gs_benifit[j]['_status_'] = 0;
                        let new_array = this.add_yg.get('benifit') as FormArray;
                        new_array.push(form_group);
                    }
                }
            }
            // <-----
            this.staffUploadService.addSocialCity().subscribe((res1) => {
                console.log(res1);
                this.upload_yg_settings.yg_city = res1.data;
                this.httpService.myGet(`${this.staffsService.getReemploy()}/${this.user_id}`)
                    .subscribe(res3 => {

                        const root_data = res3.data.data.base;
                        this.yg_name = root_data.yg_name;
                        this.httpService.myGet(`${this.staffsService.getRehireValid()}/${this.user_id}`, {search: {yg_hire_date: root_data.yg_hire_date}})
                            .subscribe(data => {
                                console.log(data);
                                this.hire_tips = data.data.tips;
                            });
                        {
                            // -->工作信息部分
                            this.staff_work_info = {
                                yg_hire_type: root_data.yg_hire_type,
                                yg_hire_date: root_data.yg_hire_date,
                                yg_formal_date: root_data.yg_formal_date,
                                yg_zhiwei: [{
                                    id: root_data.yg_zhiwei,
                                    name: root_data.yg_zhiwei_name
                                }],
                                leader_id: [{
                                    id: root_data.leader_id,
                                    name: root_data.leader_name
                                }],
                                yg_con_com_id: [{
                                    id: root_data.yg_con_com_id,
                                    name: root_data.yg_con_com_name
                                }],
                                yg_org_id: [{
                                    id: root_data.yg_org_id,
                                    name: root_data.yg_org_name
                                }],
                                yg_office: [{
                                    id: root_data.yg_office,
                                    name: root_data.yg_office_name
                                }]
                            };
                            // -->默认设置添加
                            const yg_con_com_id = this.upload_yg_default.yg_con_com_id == 0 ? '' : this.upload_yg_default.yg_con_com_id;
                            const yg_office = this.upload_yg_default.yg_office == 0 ? '' : this.upload_yg_default.yg_office;


                            let tmp_con_com_id;
                            if (this.staff_work_info.yg_con_com_id.id !== '' && this.staff_work_info.yg_con_com_id.id != yg_con_com_id) {
                                tmp_con_com_id = this.staff_work_info.yg_con_com_id.id;
                            } else {
                                tmp_con_com_id = yg_con_com_id;
                            }

                            let tmp_yg_office;
                            if (this.staff_work_info.yg_office.id !== '' && this.staff_work_info.yg_office.id != yg_office) {
                                tmp_yg_office = this.staff_work_info.yg_office.id;
                            } else {
                                tmp_yg_office = yg_con_com_id;
                            }
                            this.upload_yg_settings.yg_con_com_id.map((v, i) => {
                                if (v.id == tmp_con_com_id) {
                                    this.add_yg.get('yg_con_com_id').setValue([v]);

                                }
                            });
                            this.upload_yg_settings.yg_office.map((v, i) => {
                                if (v.id == tmp_yg_office) {
                                    this.add_yg.get('yg_office').setValue([v]);
                                }
                            });
                            for (let i in this.staff_work_info) {
                                this.add_yg.get(i).setValue(this.staff_work_info[i]);
                            }
                        }
                        // <-----
                        // <-----
                        {
                            this.staff_salary_info = {
                                yg_sallay: root_data.yg_sallay,
                                yg_try_sallay: root_data.yg_try_sallay,
                                same_with_baspay: root_data.yg_sallay == root_data.yg_try_sallay ? 1 : 0
                            };

                            for (let i in this.staff_salary_info) {
                                this.add_yg.get(i).setValue(this.staff_salary_info[i]);
                            }
                            if (this.add_yg.get('yg_hire_date').value == this.add_yg.get('yg_formal_date').value) {
                                this.add_yg.get('same_with_baspay').setValue(1);
                                this.add_yg.get('same_with_baspay').disable();
                                this.add_yg.get('yg_try_sallay').clearValidators();
                            }
                        }

                        {
                            this.staff_social_rule = {
                                yg_is_social: root_data.yg_is_social,
                                yg_is_fund: root_data.yg_is_fund,
                                yg_hk_type: [{
                                    id: root_data.yg_hk_type,
                                    name: root_data.yg_hk_type_name
                                }],
                                yg_pay_type: [{
                                    id: root_data.yg_pay_type,
                                    name: root_data.yg_pay_type_name
                                }],
                                social_rule: [{
                                    id: root_data.social_rule,
                                    name: root_data.social_rule_name
                                }],
                                social_start: root_data.social_start,
                                yg_social_self: root_data.yg_social_self,
                                social_low_base: root_data.social_low_base,
                                fund_rule: [{
                                    id: root_data.fund_rule,
                                    name: root_data.fund_rule_name
                                }],
                                fund_start: root_data.fund_start,
                                yg_fund_self: root_data.yg_fund_self,
                                fund_low_base: root_data.fund_low_base,
                            };
                            const tmp_area = root_data.yg_city;
                            for (let i in this.staff_social_rule) {
                                this.add_yg.get('social').get(i).setValue(this.staff_social_rule[i]);
                            }
                            console.log(this.add_yg);
                            this.social_city_settings = res1.data;
                            for (const province of this.social_city_settings) {
                                for (const direction of province['children']) {
                                    for (const city of direction['children']) {
                                        if (tmp_area == city.id) {
                                            this.area_list.province_list = this.social_city_settings;
                                            this.area_list.direction_list = province['children'];
                                            this.area_list.city_list = direction['children'];
                                            this.add_yg.get('social').get('province').setValue([province]);
                                            this.add_yg.get('social').get('city').setValue([direction]);
                                            this.add_yg.get('social').get('yg_city').setValue([city]);
                                        }
                                    }
                                }
                            }
                            this.add_yg.get('social').get('yg_fund_self').enable();
                            this.add_yg.get('social').get('yg_social_self').enable();
                            // if (root_data.is_edit_fund === 0 && root_data.is_edit_social === 0) {
                            //     this.assistModalService.openAssistModal('alert',
                            //         {message: [root_data.is_fund_error, res.data.data.base.is_social_error]}, () => {
                            //         });
                            //     return;
                            // } else
                            if (root_data.is_edit_social === 0) {
                                // this.assistModalService.openAssistModal('alert',
                                //     {message: [root_data.is_social_error]}, () => {
                                //     });
                                this.add_yg.get('social').get('province').disable();
                                this.add_yg.get('social').get('city').disable();
                                this.add_yg.get('social').get('social_rule').disable();
                                this.add_yg.get('social').get('social_start').disable();
                                this.add_yg.get('social').get('yg_social_self').disable();
                                this.add_yg.get('social').get('yg_city').disable();
                                this.add_yg.get('social').get('yg_hk_type').disable();
                                this.add_yg.get('social').get('yg_pay_type').disable();
                                this.add_yg.get('social').get('yg_is_social').disable();
                                this.add_yg.get('social').get('social_low_base').disable();


                            }
                            if (root_data.is_edit_fund === 0) {
                                // this.assistModalService.openAssistModal('alert',
                                //     {message: [root_data.is_fund_error]}, () => {
                                //     });
                                this.add_yg.get('social').get('province').disable();
                                this.add_yg.get('social').get('city').disable();
                                this.add_yg.get('social').get('fund_rule').disable();
                                this.add_yg.get('social').get('fund_start').disable();
                                this.add_yg.get('social').get('yg_fund_self').disable();
                                this.add_yg.get('social').get('yg_city').disable();
                                this.add_yg.get('social').get('yg_hk_type').disable();
                                this.add_yg.get('social').get('yg_pay_type').disable();
                                this.add_yg.get('social').get('yg_is_fund').disable();
                                this.add_yg.get('social').get('fund_low_base').disable();
                            }
                            this.setSocialSettings();

                        }

                        // -->员工自助部分
                        {
                            this.staff_self_info = {
                                yg_login: root_data.yg_login == 1,
                                yg_phone: root_data.yg_phone,
                            };
                            for (let i in this.staff_self_info) {
                                this.add_yg.get('contact').get(i).setValue(this.staff_self_info[i]);
                            }
                            if (!this.staff_self_info.yg_login) {
                                this.add_yg.get('contact').get('yg_phone').disable();
                            } else {
                                this.add_yg.get('contact').get('yg_phone').enable();
                            }
                        }
                        // <-----
                    });
            });


        });

        this.staffUploadService.searchPosition().subscribe((res) => {
            this.position_lists = res.data.data;
            this.search_position_lists = this.position_lists;
        });
    }


    ngAfterViewInit() {
        const newtab: Array<TabType> = [
            new TabType('工作信息', this.tabFirst),
            new TabType('薪酬信息', this.tabSecond),
            new TabType('社保公积金', this.tabThird),
            new TabType('员工自助', this.tabFourth)
        ];
        this.tabData = newtab;
        const elOffsetTop = this.nav.nativeElement.offsetTop;
        const tab1OffsetTop = this.tabFirst.nativeElement.offsetTop;
        const tab2OffsetTop = this.tabSecond.nativeElement.offsetTop;
        const tab3OffsetTop = this.tabThird.nativeElement.offsetTop;
        const tab4OffsetTop = this.tabFourth.nativeElement.offsetTop;
        this.scrollListen = this.renderer2.listen(document.getElementsByClassName('scroll-wrapper')[0], 'scroll', ($event) => {
            const e = $event;
            this.first_light = false;
            const root = document.getElementsByClassName('scroll-wrapper')[0];
            let nav;
            let inputs;
            if (!isUndefined(e.srcElement)) {
                nav = e.srcElement.getElementsByClassName('nav')[0];
                inputs = e.srcElement.getElementsByClassName('mark');
            } else {
                nav = e.target.getElementsByClassName('nav')[0];
                inputs = e.target.getElementsByClassName('mark');
            }
            for (let obj of inputs) {
                obj.checked = false;
            }
            if (root.scrollTop >= elOffsetTop) {
                nav.setAttribute('class', 'fixed-top staff-upload-index grey p-l b-b d-b nav');
                if (root.scrollTop >= tab1OffsetTop - 50 && root.scrollTop < tab2OffsetTop - 50) {
                    inputs[0].checked = true;
                } else if (root.scrollTop >= tab2OffsetTop - 50 && root.scrollTop < tab3OffsetTop - 50) {
                    inputs[1].checked = true;
                } else if (root.scrollTop >= tab3OffsetTop - 50 && root.scrollTop < tab4OffsetTop - 50) {
                    inputs[2].checked = true;
                } else if (root.scrollTop >= tab4OffsetTop - 50) {
                    inputs[4].checked = true;
                } else {
                    inputs[0].checked = false;
                }
            } else {
                nav.setAttribute('class', 'staff-upload-index grey p-l b-b d-b nav');
                inputs[0].checked = true;
            }
        });
    }

    ngOnDestroy() {
        this.modal_name_emit.unsubscribe();
        this.scrollListen();
    }

    /**
     * resetForm
     * 函数描述
     * 表单初始化
     * @params: :
     * @return:
     */
    resetForm() {
        // this.position_search.reset('');
        // this.city_first.reset('');
        this.add_yg = this.fb.group({
            yg_hire_type: ['1', Validators.required], // 员工类型
            yg_hire_date: [''], // 入职时间
            yg_formal_date: [''], // 转正时间
            yg_zhiwei: [''], // 岗位
            leader_id: [''], // 汇报对象
            yg_con_com_id: [''], // 合同公司
            yg_org_id: [''], // 所属公司
            yg_office: [''], // 办公地点
            same_with_baspay: [true],
            yg_sallay: ['', [Validators.required, requireDeci]], // 基本工资
            benifit: this.fb.array([]), // 福利
            yg_try_sallay: ['', [requireDeci]], // 试用期工资
            social: this.fb.group({
                city: [''],
                province: [''],
                yg_hk_type: [''], // 户籍类型
                yg_pay_type: [''],
                pay_plan: [''],
                yg_is_social: ['1'],
                yg_is_fund: ['1'],
                yg_city: ['', Validators.required], // 缴纳城市
                yg_social_self: [''], // 社保基数
                social_start: [''],
                social_rule: [''],
                fund_rule: [''],
                yg_fund_self: [''], // 公积金基数
                fund_start: [''],
                social_low_base: [false],
                fund_low_base: [false]
            }, {validator: socialValid}),
            contact: this.fb.group({
                yg_login: [''],
                yg_phone: [{value: '', disabled: true}],
                contact_way: [{value: '', disabled: true}],
            }, {validator: contactValid})
        });
    }

    /**
     * setStartDate, setHireDate
     * 函数描述
     * 入职，转正日期
     * @params: :
     * @return:
     */
    setStartDate(options_obj, event) {
        this.yg_formal_date = Object.assign(JSON.parse(JSON.stringify(options_obj)), {start_time: event});
        this.add_yg.get('yg_formal_date').setValue(event);
        if (this.add_yg.get('yg_hire_date').value == this.add_yg.get('yg_formal_date').value) {
            this.add_yg.get('same_with_baspay').setValue(true);
        }
    }

    setHireDate(option_obj, event) {
        this.httpService.myGet(`${this.staffsService.getRehireValid()}/${this.user_id}`, {search: {yg_hire_date: event}})
            .subscribe(data => {
                console.log(data);
                this.hire_tips = data.data.tips;
            });
        this.setStartDate(option_obj, event);
        this.add_yg.get('same_with_baspay').disable();
    }

    /**
     * setSalary
     * 函数描述
     * 设置工资
     * @params: :
     * @return:
     */

    // 如果转正日期不同，设置可以填试用期工资
    setSalary(event) {
        if (this.add_yg.get('yg_formal_date').value == this.add_yg.get('yg_hire_date').value) {
            this.add_yg.get('same_with_baspay').disable();
            this.add_yg.get('same_with_baspay').setValue(true);
        } else {
            this.add_yg.get('same_with_baspay').enable();
        }
    }

    /**
     * selectProvince
     * 函数描述
     * 选择省份
     * @params: : ,
     * @return:
     */
    selectProvince(event) {
        console.log(event);
        for (const pro of this.upload_yg_settings.yg_city) {
            if (pro.id == event.id) {
                this.city_list = pro.children;
                console.log(this.city_list);
            }
        }
    }

    /**
     * selectCity
     * 函数描述
     * 选择城市
     * @params: : ,
     * @return:
     */
    selectCity(event) {
        for (const city of this.city_list) {
            if (city.id == event.id) {
                this.direction_list = city.children;
            }
        }
    }


    /**
     * setSocialSettings
     * 函数描述
     * 请求社保公积金基本配置、公积金起缴范围
     * @params:
     * @return:
     */
    setSocialSettings() {
        setTimeout(() => {
            if (this.add_yg.get('social').get('yg_city').value && this.add_yg.get('social').get('yg_hk_type').value) {
                const hk_type = this.add_yg.get('social').get('yg_hk_type').value[0].id;
                const city_id = this.add_yg.get('social').get('yg_city').value[0].id;
                // this.add_yg.get('social').get('social_rule').setValue('');
                // this.add_yg.get('social').get('fund_rule').setValue('');
                this.social_placeholder = '填写缴纳基数';
                this.fund_placeholder = '填写缴纳基数';
                this.add_yg.get('social').get('yg_social_self')
                    .clearValidators();
                this.add_yg.get('social').get('yg_fund_self')
                    .clearValidators();
                if (hk_type !== '') {
                    this.staffUploadService.addSocialRule(city_id, hk_type).subscribe((res) => {
                        this.social_rule = res.data;
                    });
                }
                if (city_id !== '') {
                    this.staffUploadService.addSocialSetting(city_id).subscribe((res) => {
                        this.social_base_settings = res.data;
                    });

                }
                // setTimeout(() => {
                this.getCitySocial();
                this.getCityFund();
                // });
            }
        });
    }

    /**
     * getCitySocial
     * 函数描述
     * 获取城市社保政策
     * @params:
     * @return:
     */
    getCitySocial(event = '') {
        if (!this.isEmptySelect(event) || !this.isEmptySelect(this.add_yg.get('social').get('social_rule').value)) {
            if (this.add_yg.get('social').get('yg_city').value !== '') {
                const city_id = this.add_yg.get('social').get('yg_city').value[0].id;
                console.log(this.add_yg.get('social').get('social_rule').value);

                const social_rule = this.isEmptySelect(event) ? this.add_yg.get('social').get('social_rule').value[0].id : event['id'];
                console.log(city_id, social_rule);
                this.staffUploadService.getCitySocial(city_id, social_rule).subscribe((res) => {
                    console.log(res);
                    this.base_range['social_high'] = Number(res.data.max);
                    this.base_range['social_low'] = Number(res.data.min);
                    this.social_placeholder = `建议${this.base_range['social_low'].toFixed(2)}~${this.base_range['social_high'].toFixed(2)}`;
                    this.add_yg.get('social').get('yg_social_self')
                        .setValidators(socialBase(this.base_range['social_low'].toFixed(2), this.base_range['social_high'].toFixed(2)));
                });
            }
        }
    }

    /**
     * getCityFund
     * 函数描述
     * 确定公积金基数
     * @params:
     * @return:
     */
    getCityFund(event = '') {
        setTimeout(() => {
            if (!this.isEmptySelect(event) || !this.isEmptySelect(this.add_yg.get('social').get('fund_rule').value)) {
                if (this.add_yg.get('social').get('yg_city').value !== '') {
                    const city_id = this.add_yg.get('social').get('yg_city').value[0].id;
                    const fund_rule = this.isEmptySelect(event) ? this.add_yg.get('social').get('fund_rule').value[0].id : event['id'];
                    console.log(city_id, fund_rule);
                    this.staffUploadService.getCityFund(city_id, fund_rule).subscribe((res) => {
                        console.log(res);
                        this.base_range['fund_high'] = Number(res.data.max);
                        this.base_range['fund_low'] = Number(res.data.min);
                        this.fund_placeholder = `建议${this.base_range['fund_low'].toFixed(2)}~${this.base_range['fund_high'].toFixed(2)}`;
                        this.add_yg.get('social').get('yg_fund_self')
                            .setValidators(socialBase(this.base_range['fund_low'].toFixed(2), this.base_range['fund_high'].toFixed(2)));
                    });
                }
            }
        });
    }

    /**
     * lowBasePay
     * 函数描述
     * 最低基数缴纳函数
     * @params: type: 社保？公积金: social? fund
     * @return:
     */
    lowBasePay(type) {
        setTimeout(() => {
            const tmp = this.add_yg.get('social').get(`${type}_low_base`);
            if (!tmp.disabled) {
                if (this.add_yg.get('social').get(`${type}_low_base`).value) {
                    this.add_yg.get('social').get(`yg_${type}_self`).setValue(this.base_range[`${type}_low`]);
                    this.add_yg.get('social').get(`yg_${type}_self`).disable();
                } else {
                    this.add_yg.get('social').get(`yg_${type}_self`).enable();
                }
            }
        });
    }


    isEmptySelect(target) {
        let result;
        if (target === '') {
            result = true;
        } else {
            if (target instanceof Array && target[0].name === '') {
                result = true;
            } else if (target instanceof Object && target.name === '') {
                result = true;
            }
        }
        return result;
    }

    /**
     * 福利相关，显示添加
     * 函数描述
     * showBenifits, addBenifit, benifitHandler
     * @params:
     * @return:
     */
    showBenifits() {
        this.is_add_benifit = !this.is_add_benifit;
    }

    addBenifit(event) {
        // const index = event.target.value;
        // this.benifitHandler(index);
        // console.log(event);
        let tmp_obj = {};
        this.upload_yg_settings.hr_gs_benifit.map(val => {
            if (val.id == event.id) {
                tmp_obj = val;
                val['_status_'] = 0;
            }
        });

        let form_group = new FormBuilder().group({
            be_id: [{value: tmp_obj['id'], disabled: false}],
            money: [{value: tmp_obj['money'], disabled: false}, [requireDeci]]
        });
        const new_array = this.add_yg.get('benifit') as FormArray;
        this.is_add_benifit = !this.is_add_benifit;
        this.benifits_name.push(tmp_obj['name']);
        this.benifit_chosen.push(tmp_obj['id']);
        new_array.push(form_group);
    }

    benifitHandler(index) {
        this.is_add_benifit = !this.is_add_benifit;
        const name = this.upload_yg_settings.hr_gs_benifit[index]['name'];
        const money = this.upload_yg_settings.hr_gs_benifit[index]['money'];
        const target_value = this.upload_yg_settings.hr_gs_benifit[index]['id'];
        this.benifits_name.push(name);
        const form_group = new FormBuilder().group({
            be_id: [target_value],
            money: [money]
        });

        this.benifit_chosen.push(target_value);
        const new_array = this.add_yg.get('benifit') as FormArray;
        new_array.push(form_group);
    }

    cancelBenifit() {
        this.is_add_benifit = !this.is_add_benifit;
    }

    deleteBenifit(index, obj) {
        // const delete_form = this.add_yg.get(obj) as FormArray;
        // delete_form.removeAt(index);
        // this.benifit_chosen.splice(index, 1);
        // this.benifits_name.splice(index, 1);
        const delete_form = this.add_yg.get(obj) as FormArray;
        delete_form.removeAt(index);
        this.upload_yg_settings.hr_gs_benifit.map(val => {
            if (val.id == this.benifit_chosen[index]) {
                val['_status_'] = 1;
            }
        });
        this.benifit_chosen.splice(index, 1);
        this.benifits_name.splice(index, 1);
    }

    checkboxToggle(e, checkbox, inputArr: [AbstractControl]) {
        // for (const input in inputArr) {
        //     if (checkbox.value == '1') {
        //         inputArr[input].disable();
        //     } else {
        //         inputArr[input].enable();
        //     }
        // }
        e.stopPropagation();
        setTimeout(() => {
            console.log(checkbox.value);
            for (const input in inputArr) {
                if (!Boolean(checkbox.value)) {
                    inputArr[input].disable();
                } else {
                    inputArr[input].enable();
                }
            }
        });

        e.stopPropagation();
    }

    abandonAdd() {
        this.router.navigate([`/user/staff/staff-detail/${this.user_id}`]);
    }


    /**
     * setTryValidate
     * 函数描述
     * 设置试用期
     * @params:
     * @return:
     */
    setTryValidate(event) {
        event.preventDefault();
        if (this.add_yg.get('yg_hire_date').value == this.add_yg.get('yg_formal_date').value) {
            this.add_yg.get('same_with_baspay').setValue(1);
            this.add_yg.get('same_with_baspay').disable();
            this.add_yg.get('yg_try_sallay').clearValidators();
        } else {
            const value = this.add_yg.get('same_with_baspay').value;
            this.add_yg.get('same_with_baspay').setValue(!value);
            if (!this.add_yg.get('same_with_baspay').value) {
                this.add_yg.get('yg_try_sallay').setValidators([Validators.required, LegalRange(0, 90000000)]);
                this.add_yg.get('yg_try_sallay').updateValueAndValidity();
            } else {
                this.add_yg.get('yg_try_sallay').clearValidators();
            }
        }
    }


    onSubmit() {
        console.log(this.add_yg.get('contact'));
        if (this.add_yg.get('same_with_baspay').value) {
            const yg_sallay = this.add_yg.get('yg_sallay').value;
            this.add_yg.get('yg_try_sallay').setValue(yg_sallay);
        }
        if (this.add_yg.valid) {
            console.log(this.add_yg.getRawValue());
            const tmp_form = this.add_yg.getRawValue();
            this.before_submit = true;
            let data_source = {};
            data_source['yg_id'] = this.user_id;
            for (let obj in this.add_yg.getRawValue()) {
                if (obj === 'social' || obj === 'contact' || obj === 'id_valid') {
                    for (let obj_sub in tmp_form[obj]) {
                        if (tmp_form[obj][obj_sub] instanceof Array) {
                            console.log('is_array');
                            // this.formatSelect(tmp_form[obj][obj_sub]);
                            tmp_form[obj][obj_sub] = tmp_form[obj][obj_sub][0].id;
                        }
                        if (tmp_form[obj][obj_sub] === true || tmp_form[obj][obj_sub] === false) {
                            data_source[obj_sub] = tmp_form[obj][obj_sub] === true ? 1 : 0;
                        } else {
                            data_source[obj_sub] = tmp_form[obj][obj_sub];
                        }
                        if (obj_sub === 'yg_login') {
                            data_source[obj_sub] = tmp_form[obj][obj_sub] === true ? 1 : 2;
                        }
                    }
                } else if (obj !== 'benifit') {
                    if (tmp_form[obj] instanceof Array) {
                        console.log('count_arr');
                        // this.formatSelect(tmp_form[obj]);
                        tmp_form[obj] = tmp_form[obj][0].id;
                    }
                    if (tmp_form[obj] === true || tmp_form[obj] === false) {
                        data_source[obj] = tmp_form[obj] === true ? 1 : 0;
                    } else {
                        data_source[obj] = tmp_form[obj];
                    }
                } else {
                    data_source[obj] = tmp_form[obj];
                }
            }
            const except_zero_arr = [
                'yg_zhiwei', 'yg_org_id', 'leader_id', 'yg_con_com_id', 'yg_office'
            ];
            for (let i in except_zero_arr) {
                if (data_source[except_zero_arr[i]] == 0) {
                    delete data_source[except_zero_arr[i]];
                }
            }
            this.rehireStaff(data_source);
        } else {
            this.before_submit = false;
        }
    }

    rehireStaff(data_source) {
        this.httpService.myPost(this.staffsService.getRehireStaff(), data_source)
            .subscribe(data => {
                this.assistModalService.openAssistModal('toast', '重新雇佣成功', () => {
                    this.router.navigate([`/user/staff/staff-detail/${this.user_id}`]);
                });
            }, error => {
                const err = error.json();
                if (err.code == 210008) {
                    this.assistModalService.openAssistModal('confirm', ' 重新雇佣不能通过人事变动记录撤销，请谨慎操作。', () => {
                        data_source['is_confirm'] = 1;
                        this.rehireStaff(data_source);
                    });
                } else if (err.code == 210007) {
                    this.assistModalService.openAssistModal('confirm', ' 重新雇佣不能通过人事变动记录撤销，请谨慎操作。', () => {
                        data_source['is_confirm'] = 1;
                        this.rehireStaff(data_source);
                    });
                }
            });
    }

}

export class TabType {
    constructor(public title: string, public target: ElementRef) {
    }
}
