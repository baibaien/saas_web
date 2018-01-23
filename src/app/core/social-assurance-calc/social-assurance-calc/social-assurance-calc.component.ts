import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {fundBase, socialBase, socialValid} from "../../../shared/validators/staff-upload-validator";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {StaffsService} from "../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {StaffUploadService} from "../../../shared/service/staff-directory/staff-upload/staff-upload.service";
import {isUndefined} from "util";
import {LoginService} from "../../../shared/service/login/login.service";

@Component({
    selector: 'app-social-assurance-calc',
    templateUrl: './social-assurance-calc.component.html',
    styleUrls: ['./social-assurance-calc.component.less']
})
export class SocialAssuranceCalcComponent implements OnInit {
    public social;

    public social_value_watcher;
    public fund_value_watcher;


    public before_submit = true;

    // -->下拉列表数据
    public province_list;
    public city_list;
    public direction_list;


    // -->
    public base_range = {
        social_low: 0,
        social_high: 0,
        fund_low: 0,
        fund_high: 0
    };
    // <-----
    // -->
    public social_base_settings;
    // <-----


    public yg_hk_type;
    public yg_pay_type;
    // <-----

    public social_rule;

    // -->placeholder
    public social_placeholder = '填写缴纳基数';
    public fund_placeholder = '填写缴纳基数';
    // <-----

    public calc_result = [];

    public per_arr = ['per', 'fixed', 'other_money'];

    public total_calc = {};
    public table_header = [
        {column_key: 'title', column_name: '缴纳项目', column: 'title', filter: 0, selected: false, adjust: -1},
        {column_key: 'yg_per', column_name: '个人比例', column: 'yg_per', filter: 0, selected: false, adjust: 1},
        {column_key: 'yg_money', column_name: '个人缴纳金额', column: 'yg_money', filter: 0, selected: false, adjust: 1},
        {column_key: 'gs_per', column_name: '公司比例', column: 'gs_per', filter: 0, selected: false, adjust: 1},
        {column_key: 'gs_money', column_name: '公司缴纳金额', column: 'gs_money', filter: 0, selected: false, adjust: 1}
    ];

    constructor(public fb: FormBuilder,
                public httpService: HttpService,
                public staffsService: StaffsService,
                public loginService: LoginService,
                public staffUploadService: StaffUploadService) {
        document.title = '五险一金计算器';
    }

    ngOnInit() {
        this.loginService.checkToken();
        this.httpService.myGet(this.staffsService.getSocialConfig(), {})
            .subscribe(data => {
                console.log(data);
                [this.province_list, this.yg_hk_type, this.yg_pay_type] = [data.data.yg_city, data.data.yg_hk_type, data.data.yg_pay_type];
            });
        this.social = this.fb.group({
            city: [''],
            province: [''],
            yg_hk_type: ['', Validators.required], // 户籍类型
            yg_pay_type: ['1', Validators.required],
            yg_is_social: ['1', Validators.required],
            yg_is_fund: ['1', Validators.required],
            yg_city: ['', Validators.required], // 缴纳城市
            yg_social_self: ['', Validators.required], // 社保基数
            // social_start: [''],
            social_rule: ['', Validators.required],
            fund_rule: ['', Validators.required],
            yg_fund_self: ['', Validators.required], // 公积金基数
            // fund_start: [''],
            // social_low_base: [false],
            // fund_low_base: [false]
        });
        this.social_value_watcher = this.social.get('yg_is_social').valueChanges.subscribe(data => {
            console.log(data);
            if (data) {
                this.social.get('yg_social_self').enable();
                this.social.get('social_rule').enable();
            } else {
                this.social.get('yg_social_self').disable();
                this.social.get('social_rule').disable();
            }
        });
        this.fund_value_watcher = this.social.get('yg_is_fund').valueChanges.subscribe(data => {
            if (data) {
                this.social.get('yg_fund_self').enable();
                this.social.get('fund_rule').enable();
            } else {
                this.social.get('yg_fund_self').disable();
                this.social.get('fund_rule').disable();
            }
        });
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
        for (const pro of this.province_list) {
            if (pro.id == event.id) {
                this.city_list = pro.children;
                console.log(this.city_list);
            }
        }
        this.social.get('city').setValue('');
        this.social.get('yg_city').setValue('');
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
        this.social.get('yg_city').setValue('');

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
            if (this.social.get('yg_city').value && this.social.get('yg_hk_type').value) {
                const hk_type = this.social.get('yg_hk_type').value[0].id;
                const city_id = this.social.get('yg_city').value[0].id;
                this.social.get('social_rule').setValue('');
                this.social.get('fund_rule').setValue('');
                this.social_placeholder = '填写缴纳基数';
                this.fund_placeholder = '填写缴纳基数';
                this.social.get('yg_social_self')
                    .clearValidators();
                this.social.get('yg_fund_self')
                    .clearValidators();
                if (hk_type !== '') {
                    this.staffUploadService.addSocialRule(city_id, hk_type).subscribe((res) => {
                        this.social_rule = res.data;
                    });
                }
                if (city_id !== '') {
                    this.staffUploadService.addSocialSetting(city_id).subscribe((res) => {
                        this.yg_pay_type = res.data.yg_pay_type;
                    });

                }
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
            const city_id = this.social.get('yg_city').value[0].id;
            // console.log(this.social.get('social_rule').value);
            const social_rule = this.social.get('social_rule').value[0].id;
            // console.log(city_id, social_rule);
            if (city_id !== '' && social_rule !== '') {
                this.staffUploadService.getCitySocial(city_id, social_rule).subscribe((res) => {
                    console.log(res);
                    this.base_range['social_high'] = Number(res.data.max);
                    this.base_range['social_low'] = Number(res.data.min);
                    const low_tmp = Number(res.data.min);
                    this.social_placeholder = `建议${this.base_range['social_low'].toFixed(2)}~${this.base_range['social_high'].toFixed(2)}`;
                    this.social.get('yg_social_self')
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
            const city_id = this.social.get('yg_city').value[0].id;
            const fund_rule = this.social.get('fund_rule').value[0].id;
            if (city_id !== '' && fund_rule !== '') {
                this.staffUploadService.getCityFund(city_id, fund_rule).subscribe((res) => {
                    this.base_range['fund_high'] = Number(res.data.max);
                    this.base_range['fund_low'] = Number(res.data.min);
                    this.fund_placeholder = `建议${this.base_range['fund_low'].toFixed(2)}~${this.base_range['fund_high'].toFixed(2)}`;
                    this.social.get('yg_fund_self')
                        .setValidators(fundBase(this.base_range['fund_low'].toFixed(2), this.base_range['fund_high'].toFixed(2)));
                });
            }
        });
    }


    onSubmit() {

        if (this.social.valid) {
            console.log(this.social.getRawValue());
            const tmp_form = this.social.getRawValue();
            this.before_submit = true;
            const data_source = {};
            for (const obj_sub in this.social.getRawValue()) {
                if (tmp_form[obj_sub] instanceof Array) {
                    tmp_form[obj_sub] = tmp_form[obj_sub][0].id;
                }
                if (tmp_form[obj_sub] === true || tmp_form[obj_sub] === false) {
                    data_source[obj_sub] = tmp_form[obj_sub] === true ? 1 : 0;
                } else {
                    data_source[obj_sub] = tmp_form[obj_sub];
                }
                if (obj_sub === 'yg_login') {
                    data_source[obj_sub] = tmp_form[obj_sub] === true ? 1 : 2;
                }
            }
            console.log(data_source);
            this.httpService.myPost(this.staffsService.getSocialCalcResult(), data_source)
                .subscribe(data => {
                    this.total_calc = data.data.meta;
                    this.calc_result = this.changeSocialDetail(data.data.data);
                    console.log(this.calc_result);
                });
        } else {
            this.before_submit = false;
        }
    }

    changeSocialDetail(data) {
        console.log(data);
        const calc_result = [];
        let fund_tmp;
        for (const i in data) {
            if (i !== 'fund') {
                for (const j in data[i]) {
                    data[i][j]['social_per'] = this.calcPer(data[i][j]);
                }
            } else {
                fund_tmp = {};
                fund_tmp['title'] = '公积金';
                fund_tmp['gs_per'] = this.calcPer(data[i].gs);
                fund_tmp['gs_money'] = data[i].gs.money;
                fund_tmp['yg_per'] = this.calcPer(data[i].yg);
                fund_tmp['yg_money'] = data[i].yg.money;
            }
        }
        for (let i in data['gs']) {
            const tmp_gs = data['gs'][i];
            const tmp_yg = data['yg'][i];
            const result = {};
            result['title'] = tmp_gs['title'];
            result['gs_per'] = tmp_gs['social_per'];
            result['gs_money'] = tmp_gs['money'];
            result['yg_per'] = tmp_yg['social_per'];
            result['yg_money'] = tmp_yg['money'];
            calc_result.push(result);
        }
        if (!isUndefined(fund_tmp)) {
            calc_result.push(fund_tmp);
        }
        return calc_result;
    }

    calcPer(data) {
        const tmp = [];
        for (let i in this.per_arr) {
            if (!!data[this.per_arr[i]] && Number(data[this.per_arr[i]]) !== 0) {
                if (this.per_arr[i] === 'other_money' || this.per_arr[i] === 'fixed') {
                    tmp.push(data[this.per_arr[i]]);
                } else {
                    tmp.push(`${data[this.per_arr[i]]}%`);
                }
            }
        }
        if (tmp.length == 1 && tmp [0].toString().indexOf('%') == -1) {
            tmp.unshift('0%');
        }
        return tmp.length > 0 ? tmp.join('+') : '0%';
    }
}
