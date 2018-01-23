import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {
    contactValid,
    fundBase, idValid, LegalRange, requireDeci, socialBase,
    socialValid, trySallaryValid,
} from '../../../shared/validators/staff-upload-validator';
import {StaffUploadService} from '../../../shared/service/staff-directory/staff-upload/staff-upload.service';
import {DateService} from '../../../shared/service/date/date.service';
import {ModalService} from '../../../shared/service/modal/modal.service';
import {AssistModalService} from '../../../shared/service/assist-modal-service/assist-modal.service';
import {isUndefined} from "util";

@Component({
    selector: 'app-staff-upload',
    templateUrl: './staff-upload.component.html',
    styleUrls: ['./staff-upload.component.css']
})
export class StaffUploadComponent implements OnInit, OnDestroy, AfterViewInit {

    // -->页面导航节点
    @ViewChild('base') tabFirst: ElementRef;
    @ViewChild('workInfo') tabSecond: ElementRef;
    @ViewChild('salary') tabThird: ElementRef;
    @ViewChild('social_security') tabFourth: ElementRef;
    @ViewChild('staff_self') tabFifth: ElementRef;
    @ViewChild('rollingNav') nav: ElementRef;


    public tabData: Array<TabType> = [
        {title: '基本信息', target: this.tabFirst},
        {title: '工作信息', target: this.tabSecond},
        {title: '薪酬信息', target: this.tabThird},
        {title: '社保公积金', target: this.tabFourth},
        {title: '员工自助', target: this.tabFifth}
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
    public city_first = new FormControl();
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
    public office_select_config;
    public department_select_config;
    public contract_select_config;


    // -->城市列表操作
    public province_list = [];
    public city_list = [];
    public direction_list = [];
    // <-----


    constructor(public fb: FormBuilder,
                public router: Router,
                public modalService: ModalService,
                public renderer2: Renderer2,
                public staffUploadService: StaffUploadService,
                public assistModalService: AssistModalService,
                public dateService: DateService) {
        document.title = '添加员工';
        // -->岗位下拉框config
        this.position_select_config = {
            placeholder: '请选择岗位',
            allow_clear: true,
            href_text: '添加新岗位',
            href: () => {
                this.modal_name = 'staff_upload_position_update';
                this.modal_info = {
                    type: 'add'
                };
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.position_lists.push(new_position);
                };
            }
        };
        this.office_select_config = {
            placeholder: '请选择办公地点',
            allow_clear: true,
            max_length: 14,
            href_text: '添加办公地点',
            href: () => {
                this.modal_name = 'staff_office_addr';
                this.modal_info = {
                    type: 'add'
                };
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.upload_yg_settings.yg_office.push(new_position);
                };
            }
        };
        this.contract_select_config = {
            placeholder: '请选择合同公司',
            allow_clear: true,
            max_length: 14,
            href_text: '添加合同公司',
            href: () => {
                this.modal_name = 'contract_setting_m';
                this.modal_info = {
                    type: 'add'
                };
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.upload_yg_settings.yg_con_com_id.push(new_position);
                };
            }
        };
        this.department_select_config = {
            placeholder: '请选择部门',
            allow_clear: true,
            max_length: 14,
            href_text: '添加部门',
            href: () => {
                this.modal_name = 'add_modal';
                this.modal_info = undefined;
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.upload_yg_settings.yg_org_id.push(new_position);
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
        // 员工详情页基本配置
        this.staffUploadService.addStaffSettings().subscribe((res) => {
            this.upload_yg_settings = res.data.settings;
            this.upload_yg_default = res.data.default;


            // -->默认设置添加
            const yg_con_com_id = this.upload_yg_default.yg_con_com_id == 0 ? '' : this.upload_yg_default.yg_con_com_id;
            const yg_office = this.upload_yg_default.yg_office == 0 ? '' : this.upload_yg_default.yg_office;
            this.upload_yg_settings.yg_con_com_id.map((v, i) => {
                if (v.id == yg_con_com_id) {
                    this.add_yg.get('yg_con_com_id').setValue([v]);
                }
            });
            this.upload_yg_settings.yg_office.map((v, i) => {
                if (v.id == yg_office) {
                    this.add_yg.get('yg_office').setValue([v]);
                }
            });
            // <-----

            // -->证件类型select格式化处理
            // this.upload_yg_settings.id_type = this.areaFormat(this.upload_yg_settings.id_type);
            // <-----
            // -->leader_id select格式化处理
            // this.upload_yg_settings.leader_id = this.areaFormat(this.upload_yg_settings.leader_id);
            // <-----
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
                        console.log(form_group.value);
                        this.benifit_chosen.push(target_value);
                        this.upload_yg_settings.hr_gs_benifit[j]['_status_'] = 0;
                        let new_array = this.add_yg.get('benifit') as FormArray;
                        new_array.push(form_group);
                    }
                }
            }
            // <-----

            console.log(this.upload_yg_default);
            console.log(this.upload_yg_settings);
            console.log(this.social_base_settings);
            this.staffUploadService.addSocialCity().subscribe((res1) => {
                this.upload_yg_settings.yg_city = res1.data;
            });


        });

        this.staffUploadService.searchPosition().subscribe((res) => {
            this.position_lists = res.data.data;
            this.search_position_lists = this.position_lists;
        });
    }

    ngAfterViewInit() {
        const newtab: Array<TabType> = [
            new TabType('基本信息', this.tabFirst),
            new TabType('工作信息', this.tabSecond),
            new TabType('薪酬信息', this.tabThird),
            new TabType('社保公积金', this.tabFourth),
            new TabType('员工自助', this.tabFifth)
        ];
        this.tabData = newtab;
        const elOffsetTop = this.nav.nativeElement.offsetTop;

        this.scrollListen = this.renderer2.listen(document.getElementsByClassName('scroll-wrapper')[0], 'scroll', ($event) => {
            const tab1OffsetTop = this.tabFirst.nativeElement.offsetTop;
            const tab2OffsetTop = this.tabSecond.nativeElement.offsetTop;
            const tab3OffsetTop = this.tabThird.nativeElement.offsetTop;
            const tab4OffsetTop = this.tabFourth.nativeElement.offsetTop;
            const tab5OffsetTop = this.tabFifth.nativeElement.offsetTop;
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
                } else if (root.scrollTop >= tab4OffsetTop - 50 && root.scrollTop < tab5OffsetTop - 50) {
                    inputs[3].checked = true;
                } else if (root.scrollTop >= tab5OffsetTop - 50) {
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
        this.position_search.reset('');
        this.city_first.reset('');
        this.add_yg = this.fb.group({
            yg_name: ['', [Validators.required, Validators.minLength(2)]], // 姓名
            yg_no: [''], // 工号,
            id_valid: this.fb.group({
                id_type: [[{id: 1, name: '身份证'}], Validators.required], // 证件类型
                yg_identity: ['', Validators.required], // 证件号
            }, {validator: idValid}),
            yg_hire_type: ['1', Validators.required], // 员工类型
            yg_hire_date: ['', Validators.required], // 入职时间
            yg_formal_date: [''], // 转正时间
            yg_zhiwei: [''], // 岗位
            leader_id: [''], // 汇报对象
            yg_con_com_id: [''], // 合同公司
            yg_org_id: [''], // 所属公司
            yg_office: [''], // 办公地点
            same_with_baspay: [true],
            yg_sallay: ['', [Validators.required, LegalRange(0, 90000000)]], // 基本工资
            benifit: this.fb.array([]), // 福利
            yg_try_sallay: ['', LegalRange(0, 90000000)], // 试用期工资
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
        this.setStartDate(option_obj, event);
        // this.add_yg.get('same_with_baspay').disable();
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

    // 选择一级城市
    // selectFirstLevel(event) {
    //     let city_id = event.target.value;
    //     this.add_yg.get('social').get('yg_city').setValue('');
    //     this.add_yg.get('social').get('social_rule').setValue('');
    //     this.add_yg.get('social').get('fund_rule').setValue('');
    //     for (let obj of this.social_city_settings) {
    //         if (city_id == obj.id) {
    //             this.cities = obj.children;
    //         }
    //     }
    // }

    /**
     * areaFormat
     * 函数描述
     * 将城市的数据转换为指定格式
     * @params: : area列表
     * @return:
     */
    // areaFormat(area) {
    //     for (const item of area) {
    //         item.text = item.name;
    //     }
    //     return area;
    // }


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
                this.add_yg.get('social').get('social_rule').setValue('');
                this.add_yg.get('social').get('fund_rule').setValue('');
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
                //     this.getCitySocial();
                //     this.getCityFund();
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
    getCitySocial() {
        setTimeout(() => {
            const city_id = this.add_yg.get('social').get('yg_city').value[0].id;
            console.log(this.add_yg.get('social').get('social_rule').value);
            const social_rule = this.add_yg.get('social').get('social_rule').value[0].id;
            // console.log(city_id, social_rule);
            if (city_id !== '' && social_rule !== '') {
                this.staffUploadService.getCitySocial(city_id, social_rule).subscribe((res) => {
                    console.log(res);
                    this.base_range['social_high'] = Number(res.data.max);
                    this.base_range['social_low'] = Number(res.data.min);
                    const low_tmp = Number(res.data.min);
                    this.social_placeholder = `建议${this.base_range['social_low'].toFixed(2)}~${this.base_range['social_high'].toFixed(2)}`;
                    this.add_yg.get('social').get('yg_social_self')
                        .setValidators(socialBase(low_tmp.toFixed(2), this.base_range['social_high'].toFixed(2)));
                    console.log(this.base_range['social_low']);
                });
            }
        });

    }

    /**
     * getCityFund
     * 函数描述
     * 确定公积金基数
     * @params:
     * @return:
     */
    getCityFund() {
        setTimeout(() => {
            const city_id = this.add_yg.get('social').get('yg_city').value[0].id;
            const fund_rule = this.add_yg.get('social').get('fund_rule').value[0].id;
            if (city_id !== '' && fund_rule !== '') {
                this.staffUploadService.getCityFund(city_id, fund_rule).subscribe((res) => {
                    this.base_range['fund_high'] = Number(res.data.max);
                    this.base_range['fund_low'] = Number(res.data.min);
                    this.fund_placeholder = `建议${this.base_range['fund_low'].toFixed(2)}~${this.base_range['fund_high'].toFixed(2)}`;
                    this.add_yg.get('social').get('yg_fund_self')
                        .setValidators(fundBase(this.base_range['fund_low'].toFixed(2), this.base_range['fund_high'].toFixed(2)));
                });
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
            console.log(type);
            console.log(this.add_yg.get('social').get(`${type}_low_base`).value);
            if (this.add_yg.get('social').get(`${type}_low_base`).value) {
                this.add_yg.get('social').get(`yg_${type}_self`).setValue(this.base_range[`${type}_low`]);
                this.add_yg.get('social').get(`yg_${type}_self`).disable();
            } else {
                this.add_yg.get('social').get(`yg_${type}_self`).enable();
            }
        });
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
        const delete_form = this.add_yg.get(obj) as FormArray;
        delete_form.removeAt(index);
        this.benifit_chosen.splice(index, 1);
        this.benifits_name.splice(index, 1);
    }

    checkboxToggle(e, checkbox, inputArr: [AbstractControl]) {
        setTimeout(() => {
            console.log(checkbox.value);
            for (const input in inputArr) {
                if (!Boolean(checkbox.value)) {
                    console.log(123123);
                    inputArr[input].disable();
                } else {
                    inputArr[input].enable();
                }
            }
        });

        e.stopPropagation();
        // e.preventDefault();
    }


    abandonAdd() {
        this.router.navigate([`/user/staff`]);
    }


    /**
     * setTryValidate
     * 函数描述
     * 设置试用期
     * @params:
     * @return:
     */
    setTryValidate(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.add_yg.get('yg_hire_date').value == this.add_yg.get('yg_formal_date').value) {
            console.log(123123);
            this.add_yg.get('same_with_baspay').setValue(true);
            this.add_yg.get('yg_try_sallay').clearValidators();
        } else {
            console.log(234234);
            const value = this.add_yg.get('same_with_baspay').value;
            this.add_yg.get('same_with_baspay').setValue(!value);
            if (!this.add_yg.get('same_with_baspay').value) {
                this.add_yg.get('yg_try_sallay').setValidators([Validators.required, LegalRange(0, 90000000)]);
                this.add_yg.get('yg_try_sallay').updateValueAndValidity();
            } else {
                this.add_yg.get('yg_try_sallay').clearValidators();
                this.add_yg.get('yg_try_sallay').updateValueAndValidity();
            }
        }
    }


    onSubmit() {
        console.log(this.add_yg);
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


            // this.formatSelect(data_source['yg_city']);
            this.staffUploadService.addStaff(data_source).subscribe((res) => {
                this.show_guard = false;
                this.assistModalService.openAssistModal('toast', '员工添加成功', () => {
                    this.router.navigate(['/user/staff']);
                });
            });
        } else {
            this.before_submit = false;
        }
    }


    // formatSelect(data) {
    //     if (data !== '' && !isUndefined(data)) {
    //         const tmp = data[0]['id'];
    //         data = tmp;
    //         console.log(data);
    //     }
    // }
}
export class TabType {
    constructor(public title: string, public target: ElementRef) {
    }
}
