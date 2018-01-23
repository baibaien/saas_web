import {Injectable} from '@angular/core';

@Injectable()
export class NameHookService {
    public nameHook;

    constructor() {
        this.nameHook = {
            yg_gender: '性别',
            yg_city: '缴纳城市',
            yg_birth_type: '生日类型',
            yg_org_id: '部门',
            yg_zhiwei: '岗位',
            leader_id: '主管',
            yg_xueli: '学历',
            yg_con_com_id: '合同公司',
            yg_hire_type: '雇佣类型',
            yg_office: '工作地址',
            status: '员工状态',
            others: '其他',
            be_id: '享受与否',
            process_way: '处理方式',
            type: '类型',
            adjust_type: '考勤快捷调整',
            show_cover_only: '覆盖人数',
            yg_is_salary: '工资',
            is_pay_fund: '公积金',
            fund_back: '公积金补缴',
            is_pay_social: '社保',
            social_back: '社保补缴',
            yg_is_commercial: '商保',
            has_benifit: '享受与否',
            yg_login: '自助服务'

        };

    };

    getHook() {
        return this.nameHook;
    }
}
