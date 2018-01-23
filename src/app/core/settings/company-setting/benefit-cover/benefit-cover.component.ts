import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalFuncService} from '../../../../shared/service/global-func/global-func.service';
import {CompanySettingsService} from '../../../../shared/service/api-service/company-settings/company-settings.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {FormBuilder} from '@angular/forms';
import {MayihrFilterService} from "../../../../shared/service/mayihr-filter/mayihr-filter.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-benefit-cover',
    templateUrl: './benefit-cover.component.html',
    styleUrls: ['./benefit-cover.component.css']
})

export class BenefitCoverComponent implements OnInit, OnDestroy {
    public chosen_array: Array<any> = [];
    public modal_obj;
    public show_menu = -1;
    // --> 筛选条件
    public filter_term;

    public staff_benefit_list;
    public staff_benefit_info;
    // 筛选条件

    public staff_benefit_data = {
        be_id: -1
    };

    public table_header = [
        {
            column_name: '姓名',
            column: 'yg_name',
            column_key: 'yg_name',
            filter: 0,
            selected: false,
            adjust: -1
        },
        {
            column_name: '岗位',
            column: 'yg_zhiwei',
            column_key: 'yg_zhiwei',
            filter: 1,
            selected: false,
            adjust: 0
        },
        {
            column_name: '部门',
            column: 'org_name',
            column_key: 'yg_org_id',
            filter: 1,
            selected: false,
            adjust: 0
        },
        {
            column_name: '金额',
            column: 'money',
            column_key: 'money',
            filter: 2,
            selected: false,
            adjust: 0
        },

        {
            column_name: '享受与否',
            column: 'has_benifit',
            column_key: 'has_benifit',
            filter: 1,
            selected: false,
            adjust: 0
        }
    ];
    public filter_range = [
        'yg_zhiwei',
        'yg_org_id',
        'has_benifit'
    ];
    public page_info;


    public submit_data = {};

    // <--

    // -->modal显示控制
    public modal_name = '';
    public modal_info;
    public modal_callback;
    // <-----

    // -->paging用url
    public list_info_url;
    // <-----

    // -->流变量
    public list_info_emit;
    public modal_name_emit;
    public modal_func_emit;
    // <-----
    constructor(public companySetting: CompanySettingsService,
                public settingService: SettingsService,
                public modalService: ModalService,
                public globalFuncService: GlobalFuncService,
                public assistModalService: AssistModalService,
                public route: Router,
                public activatedRoute: ActivatedRoute,
                public fb: FormBuilder,
                public mayihrFilterService: MayihrFilterService) {
        // -->
        this.list_info_url = this.companySetting.getBenifitItem();
        // <-----

        // -->监控员工福利列表变化
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe((data) => {
            data.subscribe((data1) => {
                console.log(data1);
                this.page_info = data1.data.meta.pagination;
                this.staff_benefit_list = data1.data.data;
                this.staff_benefit_info = data1.data.meta.info;

            });
        });

        // <-----
        //关闭弹窗
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe((res) => {
            this.modal_name = res
        });

        // -->列表请求参数初始化
        this.submit_data = {};
        // <-----
    }


    ngOnInit() {
        // -->获取页面列表信息
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            console.log(data2);
            this.filter_term = this.mayihrFilterService.initFilter(data2.data, this.filter_range);
            this.staff_benefit_data.be_id = this.activatedRoute.snapshot.params['be_id'];
            this.list_info_url += `?be_id=${this.staff_benefit_data.be_id}`;
            this.globalFuncService.resetSubmitData();
            this.globalFuncService.setInfoListSource('post', this.list_info_url, {be_id: this.staff_benefit_data});
            this.globalFuncService.emitInfoListSource();
        });


    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
        this.modal_name_emit.unsubscribe();
    }

    // 选择编辑员工
    choseYg(chose_all: boolean = false, id = -1) {
        if (!chose_all && id >= 0) {
            // 没有点全选且传id值
            if (this.chosen_array.indexOf(id) < 0) {
                this.chosen_array.push(id);
            } else {
                let index = this.chosen_array.indexOf(id);
                this.chosen_array.splice(index, 1);
            }
        } else if (chose_all) {
            //全选
            this.chosen_array.splice(0, this.chosen_array.length);
            this.staff_benefit_list.map((item) => this.chosen_array.push(item.id));
        } else if (!chose_all && id === -1) {
            // 取消选择
            this.chosen_array.splice(0, this.chosen_array.length);
        }

    }

    // 批量开启或关闭福利
    isBenifitCover(isOpen, chosen_arr = this.chosen_array) {
        if (chosen_arr.length <= 0) {
            this.modal_name = 'modal_info';
            this.modal_obj = {
                type: 'info',
                data: '请选择至少一位员工进行批量操作'
            };
        } else {
            let data_source = {
                staff: chosen_arr.join(','),
                is_cover: isOpen ? 1 : 0,
                id: this.staff_benefit_info.id
            };
            this.settingService.isBenifitCover(data_source).subscribe((res) => {
                this.show_menu = -1;
                this.chosen_array.splice(0, this.chosen_array.length);
                this.assistModalService.openAssistModal('toast', '修改成功', () => {
                    this.globalFuncService.resetSubmitData();
                    this.globalFuncService.setInfoListSource('post', this.list_info_url, this.staff_benefit_data);
                    this.globalFuncService.emitInfoListSource();
                });
            });
        }

    }

    // showModal(modal_name, modal_info) {
    //     this.show_menu = -1;
    //     this.modal_name = modal_name;
    //     this.main_setting = modal_info;
    // }
    showBenefitMoney(info) {
        console.log(info);
        this.show_menu = -1;
        this.modal_name = 'benefit_money';
        this.modal_info = info;
        this.modal_callback = () => {
            this.globalFuncService.emitInfoListSource();
            this.choseYg();
        };
    }

    closeFilter(event) {
        for (let i in this.table_header) {
            this.table_header[i].selected = false;
        }
    }

    // 筛选框开关
    filterChooseToggle(index) {
        if (this.table_header[index].selected == false) {
            for (let i in this.table_header) {
                this.table_header[i].selected = false;
            }
            this.table_header[index].selected = true;
        } else {
            this.table_header[index].selected = false;
        }
    }

    toCompanySetting() {
        this.route.navigate(['/user/settings/company-setting/benefit']);
    }
}
