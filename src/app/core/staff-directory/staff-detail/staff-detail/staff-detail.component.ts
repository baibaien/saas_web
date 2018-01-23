import {AfterViewInit, Component, OnDestroy, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {StaffsService} from '../../../../shared/service/api-service/staff-directory/staffs/staffs.service';
import {StaffDetailService} from '../../../../shared/service/staff-directory/staff-detail/staff-detail.service';
import {
    fileExtension,
    fundBase, idValid, LegalRange, mailValid, NumLength, phoneValid, requireDeci, requireNum, socialBase,
    socialValid
} from '../../../../shared/validators/staff-upload-validator';
import {FormFormatService} from '../../../../shared/service/form-format/form-format.service';
import {StaffUploadService} from '../../../../shared/service/staff-directory/staff-upload/staff-upload.service';
import {IdNameService} from '../../../../shared/service/id-name/id-name.service';
import {isNullOrUndefined, isUndefined} from 'util';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {HttpService} from '../../../../shared/service/http-service/http.service';
import {Headers} from '@angular/http';
import {UsersService} from '../../../../shared/service/api-service/users/users.service';
import {DateService} from "../../../../shared/service/date/date.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {HrChangeService} from "../../../../shared/service/api-service/staff-directory/hr-change/hr-change.service";

@Component({
    selector: 'app-staff-detail',
    templateUrl: './staff-detail.component.html',
    styleUrls: ['./staff-detail.component.css']
})

export class StaffDetailComponent implements OnInit, AfterViewInit, OnDestroy {
    // 头部tag
    @ViewChild('base') tabFirst: ElementRef;
    @ViewChild('connection') tabSecond: ElementRef;
    @ViewChild('salary') tabThird: ElementRef;
    @ViewChild('social_security') tabFourth: ElementRef;
    @ViewChild('vacation') tabFifth: ElementRef;
    @ViewChild('account') tabSixth: ElementRef;
    @ViewChild('contract') tabSeventh: ElementRef;
    @ViewChild('family') tabEighth: ElementRef;
    @ViewChild('resume') tabNinth: ElementRef;
    @ViewChild('work') tabTenth: ElementRef;
    @ViewChild('benefit') tabEleventh: ElementRef;
    @ViewChild('rollingNav') nav: ElementRef;
    @ViewChild('target') targetEl: ElementRef;
    public tabData: Array<TabType> = [
        {title: '基本信息', target: this.tabFirst},
        {title: '联络信息', target: this.tabSecond},
        {title: '薪酬', target: this.tabThird},
        {title: '福利', target: this.tabEleventh},
        {title: '社保/公积金', target: this.tabFourth},
        {title: '出勤和假期', target: this.tabFifth},
        {title: '账户信息', target: this.tabSixth},
        {title: '劳动合同', target: this.tabSeventh},
        {title: '家庭成员', target: this.tabEighth},
        {title: '履历', target: this.tabNinth},
        {title: '工作经历', target: this.tabTenth}
    ];

    // -->开启员工自助用变量 phone
    public yg_self_phone;
    public yg_self_id; // 员工id；
    public yg_self_login;
    // <-----
    public is_edit: Boolean = false;
    // 照片上传开关
    public id_dentity: string;
    public id_dentity_reverse: string;
    public white_pic: string;

    public is_tried = true;

    public future_fire: boolean;
    public edit_benifit = false;
    public is_add_benifit = true;
    public benifit_chosen = [];
    public benifits_name = [];
    public banks;
    public sub_banks;
    public bank_id = 1;
    public bank_name;
    public sub_bank_name;
    // 字段声明
    public modal_fade = '';
    public modal_in = '';
    public modal_target = '';
    public modal_args = [];
    public current_target: string;
    public user_id: number;
    public baseEdit = false;
    public connectionEdit = false;
    public socialEdit = false;
    public accountEdit = false;
    public familyEdit = false;
    public payEdit = false;
    public benifitEdit = false;
    public modal_info: any;
    public modal_name_notice: any;
    public modal_obj: Object;
    public modal_name: string;
    public modal_name_emit;
    public modal_callback;
    public modaldata_emit;
    public base_money = {
        social_low: 0,
        social_high: 0,
        fund_low: 0,
        fund_high: 0
    };
    public social_placeholder = '填写缴纳基数';
    public fund_placeholder = '填写缴纳基数';
    public staff;
    // 表单组定义
    public base_msg: FormGroup;
    public connection_msg: FormGroup;
    public social_msg: FormGroup;
    public pay_msg: FormGroup;
    public benifit_msg: FormGroup;
    public yg_province: FormControl;
    public yg_direction: FormControl;
    // public benifit_msg: FormArray; // 福利
    public account_msg: FormGroup;

    public family_msg: FormGroup;
    public add_family: FormGroup;
    public education_msg: FormGroup;
    public add_education: FormGroup;
    public work_msg: FormGroup;
    public add_work: FormGroup;

    public formatted_data: Object;

    public familys = [];
    public person_attendance = {};


    // 社保配置项
    public social_base_settings;
    public social_rule;
    public social_range;
    public city_id;
    public cities;
    public hk_type;
    // 员工基本信息配置
    public staff_info_base;
    public staff_info_contract;
    public staff_info_benifit;
    public staff_info_familys;
    public staff_info_educations;
    public staff_info_works;
    public staff_info_img;
    public staff_info_holidays;

    public staff_setting_data;
    public social_city_settings;
    public staffDetail: Observable<any>;
    public beforesubmit = {
        base_msg: true,
        contact_msg: true,
        pay_msg: true,
        benifit_msg: true,
        social_msg: true,
        account_msg: true,
        work_msg: true,
        education_msg: true,
        // add_education: true,
        family_msg: true,
        add_family: true
    };
    // 表单状态按钮定义
    public current = {
        work: -1,
        education: -1,
        family: -1
    };
    public current_id = {
        work: -1,
        education: -1,
        family: -1
    };

    public edit_state = {
        baseEditClass: 'icon_edit_simple',
        baseEditStateText: '编辑',
        payEditClass: 'icon_edit_simple',
        payditStateText: '编辑',
        benifitEditClass: 'icon_edit_simple',
        benifitStateText: '编辑',
        connectionEditClass: 'icon_edit_simple',
        connectionEditStateText: '编辑',
        socialEditClass: 'icon_edit_simple',
        socialEditStateText: '编辑',
        accountEditClass: 'icon_edit_simple',
        accountEditStateText: '编辑',
        familyEditClass: 'icon_edit_simple',
        familyEditStateText: '编辑'
    };
    public scrollListen;
    public picture: FormGroup;
    public pic_url = {
        white_pic: {},
        id_dentity_reverse: {},
        id_dentity: {}
    };
    // -->切换
    public toggleSelfBox;
    public toggleSelfStaff;

    public edu_in_at = {
        min_view_mode: 1
    };
    public edu_out_at = {
        min_view_mode: 1
    };
    public work_in_at = {
        min_view_mode: 1
    };
    public work_out_at = {
        min_view_mode: 1,
        // start_time_type: 0
    };

// -->修改报错临时配置
    public social_info_base: any;
// <-----


    // -->select-config-area
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
    public sub_banks_async;
    public banks_page;
    // <-----


    // -->
    public id_img_control = true;
    // <-----


    // -->导航默认变绿
    public first_light = true;
    // <-----


    // -->未生效的薪酬变动记录
    public effective_salary;
    // <-----
    // -->城市列表
    public area_list = {
        province_list: [],
        direction_list: [],
        city_list: []
    };
    // <-----

    // -->
    public pay_info;
    // <-----


    // -->
    public func_acc_placeholder;
    public social_acc_placeholder;
    // <-----

    // -->
    public bank_watcher;
    // <-----
    constructor(public router: Router,
                public httpService: HttpService,
                public staffDetailRoute: ActivatedRoute,
                public fb: FormBuilder,
                public assistModalService: AssistModalService,
                public staffsService: StaffsService,
                public staffDetailService: StaffDetailService,
                public usersService: UsersService,
                public staffUploadService: StaffUploadService,
                public renderer2: Renderer2,
                public formFormat: FormFormatService,
                public idNameService: IdNameService,
                public dateService: DateService,
                public hrChangeService: HrChangeService,
                public modalService: ModalService,
                public activatedRoute: ActivatedRoute) {
        this.toggleSelfBox = this.fb.group({
            toggleSelfStaff: ['']
        });
        // 基本信息表单,
        this.base_msg = fb.group({
            yg_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            yg_birth: [],
            yg_birth_type: ['1'],
            yg_xueli: [''],
            yg_marry: [''],
            yg_no: [''],
            yg_gender: [''],
            id_valid: fb.group({
                id_type: ['', Validators.required], // 证件类型
                yg_identity: ['', Validators.required], // 证件号
            }, {validator: idValid}),
            // id_valid: fb.group({
            //     id_type: ['', Validators.required], // 证件类型
            //     yg_identity: ['', Validators.required], // 证件号
            // }),
            yg_children: [''],
            yg_nation: [''],
            yg_hk_addr: ['', Validators.maxLength(30)],
            yg_hk_post: ['', [requireNum, Validators.minLength(6), Validators.maxLength(6)]],
        });
        // 社保一级城市
        this.yg_province = fb.control('');
        this.yg_direction = fb.control('');
        // 联系人表单
        this.connection_msg = fb.group({
            yg_phone: ['', phoneValid],
            yg_bak_phone: [''],
            yg_email: ['', mailValid],
            yg_addr: ['', Validators.maxLength(30)],
            yg_post: ['', [requireNum, Validators.maxLength(6), Validators.minLength(6)]],
            yg_em_name: [''],
            yg_em_phone: ['', phoneValid],
            yg_em_rel: ['']
        });
        // 社保信息表单
        this.social_msg = fb.group({
            yg_hk_type: [''], // 户籍类型
            yg_pay_type: [''],
            // pay_plan: [''],
            yg_is_social: [false],
            yg_is_fund: [false],
            yg_city: [''], // 缴纳城市
            yg_social_self: [''], // 社保基数
            social_start: [''],
            social_rule: [''],
            fund_rule: [''],
            yg_fund_self: [''], // 公积金基数
            fund_start: [''],
            social_low_base: [''],
            fund_low_base: ['']
        }, {validator: socialValid});
        // 薪酬信息表单
        this.pay_msg = fb.group({
            same_with_baspay: [1],
            yg_sallay: ['', [Validators.required, LegalRange(0, 90000000)]], // 基本工资
            yg_try_sallay: ['0'], // 试用期工资
            effective_at: ['', Validators.required]
        });
        this.benifit_msg = fb.group({
            benifit: fb.array([])
        });

        // 账户信息
        this.account_msg = fb.group({
            yg_social_acc: ['', [NumLength(6, 20), Validators.required]],
            yg_fund_acc: ['', [NumLength(6, 20), Validators.required]],
            yg_bank_acc: ['', NumLength(6, 26)],
            // yg_bank_sub: [''],
            bank_code: [''],
            // yg_bank_name: [''],
            bank_sub_code: [''],
            social_status: [''],
            fund_status: ['']
        });
        this.work_msg = fb.group({
            company_name: ['', Validators.required],
            title: [''],
            prove_name: [''],
            prove_email: ['', mailValid],
            prove_phone: ['', phoneValid],
            in_at: [''],
            out_at: [''],
            id: [''],
            yg_id: ['']
        });
        this.family_msg = fb.group({
            name: ['', Validators.required],
            rel_id: ['', Validators.required],
            company_name: [''],
            title: [''],
            phone: ['', phoneValid],
            id: [''],
            yg_id: ['']
        });
        this.education_msg = fb.group({
            school_name: ['', Validators.required],
            major: [''],
            record: [''],
            in_at: [''],
            out_at: [''],
            id: [''],
            yg_id: [''],
            degree: ['']
        });
        // 增加家庭成员表单模板
        this.add_family = fb.group({
            name: ['', Validators.required],
            rel_id: ['', Validators.required],
            company_name: [''],
            title: [''],
            phone: ['', phoneValid]
        });
        // 增加教育经历表单模板
        this.add_education = fb.group({
            school_name: ['', Validators.required],
            major: [''],
            record: [''],
            in_at: [''],
            out_at: ['']
        });
        // 增加工作经历表单模板
        this.add_work = this.fb.group({
            company_name: ['', Validators.required],
            title: [''],
            prove_name: [''],
            prove_email: ['', mailValid],
            prove_phone: ['', phoneValid],
            in_at: [''],
            out_at: ['']
        });
        // 图片添加
        this.picture = this.fb.group({
            id_dentity_img: ['', fileExtension({msg: '请上传有效图片'})]
        });

        this.user_id = this.staffDetailRoute.snapshot.params['user_id']; // yg_id
        this.staffDetailService.setRequest(this.user_id);
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe((res) => {
            this.modal_name = res;
            this.modal_name_notice = res;
            if (this.modal_name_notice === 'modal_info') {
                this.is_edit = false;
            }
        });
        this.modaldata_emit = this.modalService.getModalDataEmit().subscribe((res) => {
            this.modal_obj = res;
        });
        this.staffDetailService.getYgBankMsg({name: ''}).subscribe((res) => {
            this.banks = [];
            res.data.data.map((item) => {
                this.banks.push({
                    id: item.bank_id,
                    name: item.bank_name
                });
            });
        });

        this.bank_watcher = this.account_msg.get('bank_code').valueChanges.subscribe(
            data => {
                if (data === '') {
                    this.account_msg.get('bank_sub_code').setValue('');
                }
            }
        );
        // 滚动条监听
        // this.scrollListen = {};
    }

    ngOnInit() {
        this.staffDetailService.getRequest().subscribe((res) => {
            this.idNameService.setName(res.data.data.base.id, res.data.data.base.yg_name);
            this.person_attendance['id'] = res.data.data.base.id;
            this.person_attendance['text'] = res.data.data.base.yg_name;
            this.staff_info_base = this.formFormat.sourceToForm(res.data.data.base);
            document.title = `<${this.staff_info_base.yg_name}>员工详情`;
            console.log(this.staff_info_base);
            this.yg_self_phone = this.staff_info_base.yg_phone;
            if (this.staff_info_base.yg_login == 1) {
                this.toggleSelfBox.get('toggleSelfStaff').setValue(this.staff_info_base.yg_login);
            } else {
                this.toggleSelfBox.get('toggleSelfStaff').setValue('');
            }
            this.staff_info_base['employee_time'] = this.calcEmployee(res.data.data.base.yg_employee_day);
            this.staff_info_base['effective_at'] = '';
            this.staff_info_base['hospital'] = res.data.data.hospital;
            this.staff_info_contract = this.formFormat.sourceToForm(res.data.data.contract);
            this.staff_info_benifit = res.data.data.benifit;
            this.staff_info_works = res.data.data.works;
            this.staff_info_educations = res.data.data.edus;
            this.staff_info_familys = res.data.data.family;
            this.staff_info_img = res.data.data.certificate_images;
            this.staff_info_holidays = res.data.data.holidays;

            // -->离职日期在未来或过去
            if (this.staff_info_base.button_status.type == 5) {
                const tmp_curr = new Date(this.staff_info_base.button_status.curr_date).getTime();
                const tmp_date = new Date(this.staff_info_base.button_status.date).getTime();
                if (tmp_curr < tmp_date) {
                    this.staff_info_base.button_status.is_future = '将于';
                } else {
                    this.staff_info_base.button_status.is_future = '已于';
                }
            }
            // <-----

            // -->薪酬能否变动数据处理
            this.effective_salary = res.data.data.in_effective_salary;
            console.log(this.effective_salary);
            if (this.staff_info_base.yg_sallay === this.staff_info_base.yg_try_sallay) {
                this.staff_info_base.same_with_baspay = 1;
            } else {
                this.staff_info_base.same_with_baspay = '';
            }
            if (!(this.effective_salary instanceof Array)) {
                this.pay_info = `新的薪资方案将于${this.effective_salary.effective_at}生效`;
            } else {
                this.pay_info = '';
            }
            // <-----
            // this.staff_info_holidays.annual_leavel_length = this.dateService.timetoggle(this.staff_info_holidays.annual_leavel_length);
            for (let i of res.data.data.certificate_images) {
                console.log(i);
                if (i.type === 1) {
                    this.pic_url['id_dentity']['url'] = i.url;
                    this.pic_url['id_dentity']['id'] = i.id;
                } else if (i.type == 2) {
                    this.pic_url['id_dentity_reverse']['url'] = i.url;
                    this.pic_url['id_dentity_reverse']['id'] = i.id;
                } else if (i.type == 6) {
                    this.pic_url['white_pic']['url'] = i.url;
                    this.pic_url['white_pic']['id'] = i.id;
                }
            }
            this.benifit_chosen = this.staff_info_benifit.map(item => item.be_id);


            this.staffDetailService.setStaffSetting().subscribe((res1) => {
                // 页面信息设置
                console.log(res1);
                this.staff_setting_data = res1.data.settings;

            });
            this.staffUploadService.addSocialCity().subscribe((res1) => {
                // 获得缴纳城市下拉框，并初始化社保参数
                this.social_city_settings = res1.data;
                for (const province of this.social_city_settings) {
                    for (const direction of province['children']) {
                        for (const city of direction['children']) {
                            if (this.staff_info_base.yg_city.id == city.id) {
                                this.area_list.province_list = this.social_city_settings;
                                this.area_list.direction_list = province['children'];
                                this.area_list.city_list = direction['children'];
                                this.yg_province.setValue([province]);
                                this.yg_direction.setValue([direction]);
                                this.social_msg.get('yg_city').setValue([city]);
                            }
                        }
                    }
                }
            });
            for (let i = 0; i < this.staff_info_img.length; i++) {
                switch (this.staff_info_img[i]['id']) {
                    case 1:
                        this.id_dentity = this.staff_info_img[i]['url'];
                        break;
                    case 2:
                        this.id_dentity_reverse = this.staff_info_img[i]['url'];
                        break;
                    case 7:
                        this.white_pic = this.staff_info_img[i];
                        break;
                    default:
                        break;
                }
            }
        });

    }

    ngAfterViewInit() {

        const newtab: Array<TabType> = [
            new TabType('基本信息', this.tabFirst),
            new TabType('联络信息', this.tabSecond),
            new TabType('薪酬', this.tabThird),
            new TabType('福利', this.tabEleventh),
            new TabType('社保/公积金', this.tabFourth),
            new TabType('出勤和假期', this.tabFifth),
            new TabType('账户信息', this.tabSixth),
            new TabType('劳动合同', this.tabSeventh),
            new TabType('家庭成员', this.tabEighth),
            new TabType('教育经历', this.tabNinth),
            new TabType('工作经历', this.tabTenth)
        ];
        this.tabData = newtab;
        const elOffsetTop = this.nav.nativeElement.offsetTop;


        this.scrollListen = this.renderer2.listen(document.getElementsByClassName('scroll-wrapper')[0], 'scroll', ($event) => {
            const e = $event;
            // const elOffsetTop = this.nav.nativeElement.offsetTop;
            const tab1OffsetTop = this.tabFirst.nativeElement.offsetTop;
            const tab2OffsetTop = this.tabSecond.nativeElement.offsetTop;
            const tab3OffsetTop = this.tabThird.nativeElement.offsetTop;
            const tab11OffsetTop = this.tabEleventh.nativeElement.offsetTop;
            const tab4OffsetTop = this.tabFourth.nativeElement.offsetTop;
            const tab5OffsetTop = this.tabFifth.nativeElement.offsetTop;
            const tab6OffsetTop = this.tabSixth.nativeElement.offsetTop;
            const tab7OffsetTop = this.tabSeventh.nativeElement.offsetTop;
            const tab8OffsetTop = this.tabEighth.nativeElement.offsetTop;
            const tab9OffsetTop = this.tabNinth.nativeElement.offsetTop;
            const tab10OffsetTop = this.tabTenth.nativeElement.offsetTop;
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
            if (root.scrollTop >= elOffsetTop + 80) {
                nav.setAttribute('class', 'fixed-top staff-detail-index grey b-b d-b nav');
                if (root.scrollTop >= tab1OffsetTop - 50 && root.scrollTop < tab2OffsetTop - 50) {
                    inputs[0].checked = true;
                } else if (root.scrollTop >= tab2OffsetTop - 50 && root.scrollTop < tab3OffsetTop - 50) {
                    inputs[1].checked = true;
                } else if (root.scrollTop >= tab3OffsetTop - 50 && root.scrollTop < tab11OffsetTop - 50) {
                    inputs[2].checked = true;
                } else if (root.scrollTop >= tab11OffsetTop - 50 && root.scrollTop < tab4OffsetTop - 50) {
                    inputs[3].checked = true;
                } else if (root.scrollTop >= tab4OffsetTop - 50 && root.scrollTop < tab5OffsetTop - 50) {
                    inputs[4].checked = true;
                } else if (root.scrollTop >= tab5OffsetTop - 50 && root.scrollTop < tab6OffsetTop - 50) {
                    inputs[5].checked = true;
                } else if (root.scrollTop >= tab6OffsetTop - 50 && root.scrollTop < tab7OffsetTop - 50) {
                    inputs[6].checked = true;
                } else if (root.scrollTop >= tab7OffsetTop - 50 && root.scrollTop < tab8OffsetTop - 50) {
                    inputs[7].checked = true;
                } else if (root.scrollTop >= tab8OffsetTop - 50 && root.scrollTop < tab9OffsetTop - 50) {
                    inputs[8].checked = true;
                } else if (root.scrollTop >= tab9OffsetTop - 50 && root
                        .scrollTop < tab10OffsetTop - 50) {
                    inputs[8].checked = true;
                } else if (root.scrollTop >= tab10OffsetTop - 50) {
                    inputs[9].checked = true;
                } else {
                    inputs[0].checked = false;
                }
            } else {
                nav.setAttribute('class', 'staff-detail-index grey b-b d-b nav');
                inputs[0].checked = true;
            }
        });
    }

    ngOnDestroy() {
        this.scrollListen();
        this.modal_name_emit.unsubscribe();
        this.modaldata_emit.unsubscribe();
    }


    /**
     * cancelRegular
     * 函数描述
     * 撤销转正或离职
     * @params: id：变动id， yg_id： 员工id
     * @return:
     */
    cancelRegular(id, yg_id, status) {
        let text;
        if (status == 'regular') {
            text = '确定撤销转正？撤销后将恢复员工状态为试用，并恢复使用试用期工资';
        } else {
            text = '确定撤销离职？';
        }
        this.assistModalService.openAssistModal('confirm', text, () => {
            this.httpService.myPost(this.hrChangeService.getRevokeChange(), JSON.stringify({id: id, yg_id: yg_id}))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '撤销成功', () => {
                        this.ngOnInit();
                    });
                });
        });
    }


    // -->司龄转换
    calcEmployee(time) {
        if (time < 30) {
            return `${time}天`;
        } else if (time < 365) {
            return `${Math.floor(time / 30)}月${time % 30}天`;
        } else {
            let tmp = time % 365 !== 12 ? time % 365 : 11;
            return `${Math.floor(time / 365)}年${Math.floor(tmp / 30)}月${tmp % 30}天`;
        }
    }

    // <-----
    // -->员工自助切换
    openToggleModal(event) {
        event.preventDefault();
        this.yg_self_login = this.staff_info_base.yg_login;
        if (this.yg_self_phone === '') {
            this.assistModalService.openAssistModal('alert', '如需开启员工自助，请先填写员工联络信息中的手机号码');

        } else {
            this.modal_info = this.staff_info_base.yg_login;
            const status = window.localStorage.getItem('user_self_help');
            if (Number(status) == 1) {
                this.modal_name = 'staff_self';
            } else {
                this.toggleYgSelf();
            }
        }
    }

    // -->

    // <-----

    toggleYgSelf() {
        this.yg_self_login = this.staff_info_base.yg_login;

        this.yg_self_id = this.activatedRoute.snapshot.params['user_id'];
        if (this.yg_self_login == 2) {
            this.httpService.myPost(this.staffsService.getStaffSelf(), {
                yg_phone: this.yg_self_phone,
                yg_login: 1,
                yg_id: this.yg_self_id
            }).subscribe(data => {
                this.toggleSelfBox.get('toggleSelfStaff').setValue(data.data.yg_login);
                this.staff_info_base.yg_login = 1;
            });
        } else {
            this.httpService.myPost(this.staffsService.getStaffSelf(), {
                yg_phone: this.yg_self_phone,
                yg_login: 2,
                yg_id: this.yg_self_id
            }).subscribe(data => {
                this.toggleSelfBox.get('toggleSelfStaff').setValue('');
                this.staff_info_base.yg_login = 2;
                this.yg_self_login = this.staff_info_base.yg_login;
            });
        }
    }

    // -->获取modal结果
    getModalResult(event) {
        if (event.modal_name === 'staff_self') {
            this.getStaffSelfResult(event);
        }
    }

    // <-----
    // -->
    getStaffSelfResult(event) {
        if (event.result) {
            this.toggleYgSelf();
        } else {
            this.toggleSelfBox.get('toggleSelfStaff').setValue(this.staff_info_base.yg_login);
            if (this.toggleSelfBox.get('toggleSelfStaff').value == 2) {
                this.toggleSelfBox.get('toggleSelfStaff').setValue('');
            }
        }
    }

    // <-----
    // <-----


    // 字符串首字母大写
    upperFirstStr(str) {
        return str.replace(/\b\w+\b/g, function () {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        });
    }

    uploadImg(event: any, pic_url, picture_type) {
        // if (event.target.files.length > 0) {
        //     const temp_data = event.target.files[0];
        const form_data = new FormData();
        form_data.append('file', event);
        form_data.append('type', picture_type);
        form_data.append('yg_id', this.user_id);
        // this.Foo(form_data, pic_url);
        const header = new Headers();
        header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
        this.httpService.myPost(this.staffsService.uploadYgPics(), form_data, {headers: header}).subscribe(data => {
            console.log(data);
            console.log(data);
            this.pic_url[pic_url]['url'] = data.data.url;
            this.pic_url[pic_url]['id'] = data.data.id;
            // this.id_img_control = false;
            // setTimeout(() => {
            //     this.id_img_control = true;
            // });
        });
        // }
    }

    // Foo(form_data, pic_url) {
    //
    // }

    deleteImg(img) {
        console.log(img);
        this.staffDetailService.deleteYgPic(img.id).subscribe((res) => {
            img.url = null;
        });
    }

// 初始化页面向循环表单添加数据
    addDataIntoForms(ajaxData, formData) {
        for (const k in ajaxData) {
            console.log(ajaxData[k]);
            formData.addControl(k, this.fb.control(''));
            formData.controls[k].setValue(ajaxData[k]);
            console.log(formData);
        }
        // }
    }

// 显示弹窗
    showModal(current_target, ...arg) {
        this.modal_fade = 'fade';
        this.modal_in = 'in';
        this.current_target = current_target;
        this.modal_args = arg;
    }

    hideModal() {
        this.modal_fade = '';
        this.modal_in = '';
        this.modal_args = [];
        this.current_target = '';
    }

    confirmModal(event) {
        this.hideModal();
        if (event.func_name === 'init') {
            this.ngOnInit();
        } else {
            this[event.func_name](event.args);
        }
    }

    deleteForm(args) {
        // args[0]:删除第几条视图数据; args[1]:请求删除id;args[2]:ajax数据;args[3]:请求地址;
        let ajaxUrl = this.upperFirstStr(args[3]);
        this.staffDetailService[`delete${ajaxUrl}`](args[1]).subscribe((res) => {
            args[2].splice(args[0], 1);
        });
    }


    addNewContract(args) {
        for (let obj in args) {
            this.staff_info_contract[obj] = args[obj];
        }
    }

// 编辑按钮状态
    editCancel(class_state) {
        this[class_state] = !this[class_state];
        this['edit_state'][class_state + 'Class'] = this['edit_state'][class_state] ? 'icon-save' : 'icon_edit_simple';
        this['edit_state'][class_state + 'StateText'] = this[class_state] ? '保存' : '编辑';
        let form_obj = `${class_state.substring(0, class_state.indexOf('Edit'))}_msg`;
        this[form_obj].reset('');
    }

// 编辑基本信息
    editForm(class_state, form_obj, source_data, post_url, ...arg: Array<any>) {
        // 保存编辑状态
        if (post_url === 'social') {
            this.staffDetailService.getSocialState(this.user_id).subscribe((res) => {
                // this.social_msg.reset('');
                this.social_msg.get('yg_fund_self').enable();
                this.social_msg.get('yg_social_self').enable();
                if (res.data.is_edit_fund === 0 && res.data.is_edit_social === 0) {
                    this.assistModalService.openAssistModal('alert',
                        {message: [res.data.is_fund_error, res.data.is_social_error]}, () => {
                        });
                    return;
                } else if (res.data.is_edit_social === 0) {
                    this.assistModalService.openAssistModal('alert',
                        {message: [res.data.is_social_error]}, () => {
                        });
                    this.yg_province.disable();
                    this.yg_direction.disable();
                    this.social_msg.get('social_rule').disable();
                    this.social_msg.get('social_start').disable();
                    this.social_msg.get('yg_social_self').disable();
                    this.social_msg.get('yg_city').disable();
                    this.social_msg.get('yg_hk_type').disable();
                    this.social_msg.get('yg_pay_type').disable();
                    this.social_msg.get('yg_is_social').disable();
                    this.social_msg.get('social_low_base').disable();

                } else if (res.data.is_edit_fund === 0) {
                    this.assistModalService.openAssistModal('alert',
                        {message: [res.data.is_fund_error]}, () => {
                        });
                    this.yg_province.disable();
                    this.yg_direction.disable();
                    this.social_msg.get('fund_rule').disable();
                    this.social_msg.get('fund_start').disable();
                    this.social_msg.get('yg_fund_self').disable();
                    this.social_msg.get('yg_city').disable();
                    this.social_msg.get('yg_hk_type').disable();
                    this.social_msg.get('yg_pay_type').disable();
                    this.social_msg.get('yg_is_fund').disable();
                    this.social_msg.get('fund_low_base').disable();
                }
                this.setFormValue(form_obj, source_data, arg);
                this.setSocialSettings(false);
                this.social_msg.get('yg_is_social').setValue(Number(this.staff_info_base.yg_is_social) !== 0);
                this.social_msg.get('yg_is_fund').setValue(Number(this.staff_info_base.yg_is_fund) !== 0);
                this.social_msg.get('social_rule').setValue([this.staff_info_base['social_rule']]);
                this.social_msg.get('fund_rule').setValue([this.staff_info_base['fund_rule']]);
                this[class_state] = true;
            });
        } else if (post_url === 'pay') {
            if (!(this.effective_salary instanceof Array)) {
                this.assistModalService.openAssistModal('alert',
                    '存在未生效的薪酬调整记录，请在“薪酬\/人事变动记录”中查看和管理', () => {
                    });
                return;
            } else {
                this.setFormValue(form_obj, source_data, arg);
                this.pay_info = '';
                if (this.staff_info_base.yg_sallay === this.staff_info_base.yg_try_sallay) {
                    this.staff_info_base.same_with_baspay = 1;
                } else {
                    this.staff_info_base.same_with_baspay = '';
                }
                this[class_state] = true;
            }
        } else {
            this.setFormValue(form_obj, source_data, arg);
            this[class_state] = true;
        }
    }

    saveForm(class_state, form_obj, source_data, post_url, ...arg: Array<any>) {

        // 次序不能乱，次序不能乱！
        this.beforesubmit[`${post_url}_msg`] = false;
        post_url = this.upperFirstStr(post_url);

        if (form_obj.valid) {
            const submit_data = this.getSubmitData(form_obj, arg);
            submit_data['yg_id'] = this.user_id;
            this.staffDetailService[`updateYg${post_url}Msg`](this.user_id, submit_data).subscribe((res) => {
                this.yg_self_phone = res.data.yg_phone;
                if (post_url === 'Pay') {
                    this.effective_salary = res.data.data.in_effective_salary;
                    if (this.staff_info_base.yg_sallay === this.staff_info_base.yg_try_sallay) {
                        this.staff_info_base.same_with_baspay = 1;
                    } else {
                        this.staff_info_base.same_with_baspay = '';
                    }
                    this.staff_info_base.yg_sallay = res.data.data.base.yg_sallay;
                    this.staff_info_base.yg_try_sallay = res.data.data.base.yg_try_sallay;
                    this.staff_info_base.effective_at = this.pay_msg.get('effective_at').value;
                    if (!(this.effective_salary instanceof Array)) {
                        this.pay_info = `新的薪资方案将于${this.effective_salary.effective_at}生效`;
                    } else {
                        this.pay_info = '';
                    }
                } else if (post_url === 'Base') {
                    form_obj.get('yg_no').setValue(res.data.data.base.yg_no);
                    this.toggleForm(form_obj, source_data, arg);
                } else if (post_url === 'Social') {
                    this.toggleForm(form_obj, source_data, arg);
                    this.social_msg.get('yg_fund_self').setValue(res.data.data.base.yg_fund_self);
                    this.social_msg.get('yg_social_self').setValue(res.data.data.base.yg_social_self);
                    this.staff_info_base.yg_social_self = res.data.data.base.yg_social_self;
                    this.staff_info_base.yg_fund_self = res.data.data.base.yg_fund_self;

                } else {
                    this.toggleForm(form_obj, source_data, arg);
                }
                this[class_state] = !this[class_state];
                this.beforesubmit[`${post_url}_msg`] = true;
            });
            // 请求保存数据
        }
    }


    /**
     * watchAccountStatus
     * 函数描述
     * 监控checkbox
     * @params:
     * @return:
     */
    watchAccountStatus(event, type) {
        event.stopPropagation();
        this.account_msg.get(`${type}_status`).setValue(!this.account_msg.get(`${type}_status`).value);
        console.log(this.account_msg.controls);
        if (this.account_msg.get(`${type}_status`).value) {
            this.account_msg.get(`yg_${type}_acc`).enable();
            this.account_msg.get(`yg_${type}_acc`).markAsUntouched();
            this.account_msg.get(`yg_${type}_acc`).updateValueAndValidity();
        } else {
            this.account_msg.get(`yg_${type}_acc`).disable();
        }

    }

    // 编辑账户表单
    editAccount() {
        this.beforesubmit.account_msg = true;
        this.accountEdit = true;
        for (let obj in this.account_msg.controls) {
            let value = this.staff_info_base[obj];
            console.log(obj);
            console.log(JSON.parse(JSON.stringify(this.staff_info_base)));
            if (obj == 'fund_status' || obj == 'social_status') {
                value = (value['id'] == 1);
                if (obj === 'fund_status') {
                    this.account_msg.get('fund_status').setValue(value);
                    if (this.account_msg.get(`fund_status`).value) {
                        this.account_msg.get(`yg_fund_acc`).enable();

                    } else {
                        this.account_msg.get(`yg_fund_acc`).disable();

                    }
                } else {
                    this.account_msg.get('social_status').setValue(value);
                    if (this.account_msg.get(`social_status`).value) {
                        this.account_msg.get(`yg_social_acc`).enable();

                    } else {
                        this.account_msg.get(`yg_social_acc`).disable();

                    }
                }
                this.account_msg.get(obj).setValue(value);
            } else if (obj === 'bank_sub_code') {
                if (this.staff_info_base.bank_sub_name == '') {
                    this.account_msg.get(obj).setValue('');
                } else {
                    this.account_msg.get(obj).setValue([{
                        name: this.staff_info_base.bank_sub_name,
                        id: this.staff_info_base.bank_sub_code
                    }]);
                    this.sub_banks = [{
                        name: this.staff_info_base.bank_sub_name,
                        id: this.staff_info_base.bank_sub_code
                    }];
                }
            } else if (obj === 'bank_code') {
                if (this.staff_info_base.bank_name == '') {
                    this.account_msg.get(obj).setValue('');
                } else {
                    this.account_msg.get(obj).setValue([{
                        name: this.staff_info_base.bank_name,
                        id: this.staff_info_base.bank_code
                    }]);

                }
            } else {
                this.account_msg.get(obj).setValue(value);
            }
        }
    }

    saveAccount() {
        console.log(this.account_msg.getRawValue());
        console.log(this.account_msg);
        this.beforesubmit.account_msg = false;
        if (this.account_msg.valid) {
            this.beforesubmit.account_msg = true;
            const submit_data = JSON.parse(JSON.stringify(this.account_msg.getRawValue()));
            submit_data['yg_id'] = this.user_id;
            submit_data['bank_code'] = submit_data['bank_code'] === '' ? '' : submit_data['bank_code'][0].id;
            submit_data['bank_sub_code'] = submit_data['bank_sub_code'] === '' ? '' : submit_data['bank_sub_code'][0].id;
            submit_data['fund_status'] = Number(submit_data['fund_status']);
            submit_data['social_status'] = Number(submit_data['social_status']);
            this.staffDetailService.updateYgAccountMsg(this.user_id, submit_data).subscribe((res) => {
                const tmp_data = JSON.parse(JSON.stringify(res.data.data.base));
                tmp_data['fund_status'] = {
                    id: res.data.data.base.fund_status,
                    name: res.data.data.base.fund_status_name
                };
                tmp_data['social_status'] = {
                    id: res.data.data.base.social_status,
                    name: res.data.data.base.social_status_name
                };
                delete tmp_data.fund_status_name;
                delete tmp_data.social_status_name;
                console.log(res);
                console.log(tmp_data);
                for (let i in tmp_data) {
                    this.staff_info_base[i] = tmp_data[i];
                }
                this.accountEdit = false;
                console.log(this.staff_info_base);
            });
        }
    }

// 编辑状态表单预填充已有值
    setFormValue(form_obj, source_data, arg) {
        console.log(source_data);
        console.log(form_obj.controls);
        for (let obj in form_obj.controls) {
            let value;
            for (let i = 0; i < arg.length; i++) {
                if (obj === arg[i]) {
                    for (let item in form_obj.controls[obj].controls) {
                        value = source_data[item].hasOwnProperty('id') ? [source_data[item]] : source_data[item];
                        form_obj.controls[arg[i]].controls[item].setValue(value);
                    }
                }
            }
            if (!form_obj.controls[obj].controls) {
                if (obj === 'yg_gender') {
                    value = source_data[obj].hasOwnProperty('id') ? String(source_data[obj].id) : source_data[obj];
                    form_obj.controls[obj].setValue(value);
                } else if (obj === 'social_low_base' || obj === 'fund_low_base') {
                    form_obj.controls[obj].setValue('');
                } else {
                    value = source_data[obj].hasOwnProperty('id') ? [source_data[obj]] : source_data[obj];
                    console.log(value);
                    form_obj.controls[obj].setValue(value);
                }
            }
        }
    }

    /**
     * *fillTest
     * 函数描述
     * 检测是否为填充导致的表单变化
     * @params:
     * @return:
     */
    // -->
    // *fillTest(items) {
    //     for (let i of items) {
    //         yield i;
    //     }
    // }

    // <-----


// 视图上拿到提交数据
    getSubmitData(form_obj, arg) {
        console.log(form_obj.value);
        let submit_data = {};
        for (let obj in form_obj.controls) {
            for (let i = 0; i < arg.length; i++) {
                if (obj === arg[i]) {
                    // 表单里有嵌套表单
                    for (let item in form_obj.controls[arg[i]].controls) {
                        // 提交表单
                        if (form_obj.controls[arg[i]].controls[`${item}`].value === true || form_obj.controls[arg[i]].controls[`${item}`].value === false) {
                            // 复选框特殊处理
                            submit_data[item] = form_obj.controls[arg[i]].controls[`${item}`].value === true ? 1 : 0;
                        } else {
                            submit_data[item] = form_obj.controls[arg[i]].controls[`${item}`].value;
                        }
                        if (form_obj.controls[arg[i]].controls[`${item}`].value instanceof Array) {
                            submit_data[item] = form_obj.controls[arg[i]].controls[`${item}`].value[0].id;
                        }
                    }
                }
            }
            if (!form_obj.controls[obj].controls) {
                if (form_obj.controls[obj].value instanceof Array) {
                    submit_data[obj] = form_obj.controls[obj].value[0].id;
                } else if (form_obj.controls[obj].value === true || form_obj.controls[obj].value === false) {
                    submit_data[obj] = form_obj.controls[obj].value === true ? 1 : 0;
                } else {
                    submit_data[obj] = form_obj.controls[obj].value;
                }
            }
        }
        return submit_data;
    }

// 视图上保存表单更改项
    toggleForm(form_obj, source_data, arg) {
        for (let obj in form_obj.controls) {
            for (let i = 0; i < arg.length; i++) {
                if (obj === arg[i]) {
                    // 表单里有嵌套表单
                    for (let item in form_obj.controls[arg[i]].controls) {
                        if (source_data[item].hasOwnProperty('id')) {
                            let test_id;
                            if (form_obj.controls[arg[i]].controls[`${item}`].value instanceof Array) {
                                test_id = form_obj.controls[arg[i]].controls[`${item}`].value[0].id;
                            } else {
                                test_id = form_obj.controls[arg[i]].controls[`${item}`].value;
                            }
                            this.staff_setting_data[item].map((index) => {
                                if (index.id == test_id) {
                                    // 格式标准化
                                    source_data[item] = {
                                        id: index.id,
                                        name: index.name
                                    };
                                }
                            });
                        } else {
                            source_data[item] = form_obj.controls[arg[i]].controls[`${item}`].value;
                        }
                    }
                }
            }
            if (!form_obj.controls[obj].controls) {
                if (obj !== 'social_low_base' && obj !== 'fund_low_base') {
                    if (source_data[obj].hasOwnProperty('id')) {
                        let test_id;
                        if (form_obj.controls[obj].value instanceof Array) {
                            test_id = form_obj.controls[obj].value[0].id;
                        } else {
                            test_id = form_obj.controls[obj].value;
                        }
                        if (obj == 'social_rule' || obj == 'fund_rule') {
                            if (!isNullOrUndefined(this.social_rule)) {
                                this.social_rule[obj].map((index) => {
                                    if (index.id == test_id) {
                                        source_data[obj] = {
                                            id: index.id,
                                            name: index.name
                                        };
                                    }
                                });
                            }
                        } else {
                            if (obj === 'yg_city') {
                                console.log(source_data);
                                for (let i of this.staff_setting_data[obj]) {
                                    for (let j of i.children) {
                                        for (let z of j.children) {
                                            if (z.id === test_id) {
                                                console.log(z);
                                                source_data[obj] = {
                                                    id: z.id,
                                                    name: z.name
                                                };
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (let i in this.staff_setting_data[obj]) {
                                    const index = this.staff_setting_data[obj][i];
                                    if (index.id == test_id) {
                                        source_data[obj] = {
                                            id: index.id,
                                            name: index.name
                                        };
                                        console.log(JSON.parse(JSON.stringify(source_data)));
                                        break;
                                    }
                                    source_data[obj] = {
                                        id: '',
                                        name: ''
                                    };
                                }
                            }
                        }
                    } else {
                        source_data[obj] = form_obj.controls[obj].value;
                    }
                }
            }
        }
    }

    setBenifitValue(benifit_msg: FormGroup) {
        const benifit_item = benifit_msg.get('benifit') as FormArray;
        this['benifitEdit'] = !this['benifitEdit'];
        for (let i = 0; i < this.staff_info_benifit.length; i++) {
            const benifit = new FormBuilder().group({
                be_id: [{value: this.staff_info_benifit[i].be_id, disabled: false}],
                money: [{value: this.staff_info_benifit[i].money, disabled: false}, [requireDeci]],
                unit: [this.staff_info_benifit[i].unit]
            });
            benifit_item.push(benifit);
            this.benifits_name.push(this.staff_info_benifit[i].be_name);
            this.benifit_chosen.push(this.staff_info_benifit[i].be_id);
            this.staff_setting_data.hr_gs_benifit.map(val => {
                if (val.id == this.staff_info_benifit[i].be_id) {
                    val._status_ = 0;
                }
            });
        }
    }

    saveBenifit() {
        let submit_data = {benifit: [], yg_id: -1};
        submit_data.yg_id = this.user_id;
        if (this.benifit_msg.get('benifit').valid) {
            for (let i = 0; i < this.benifit_msg.get('benifit').value.length; i++) {
                let new_benifit = {};
                new_benifit['be_id'] = this.benifit_msg.get('benifit').value[i]['be_id'];
                new_benifit['money'] = this.benifit_msg.get('benifit').value[i]['money'];
                submit_data.benifit.push(new_benifit);
            }
            this.staffDetailService.updateYgBenifitMsg(this.user_id, submit_data).subscribe((res) => {
                this.staffDetailService.getRequest().subscribe((res) => {
                    this.staff_info_benifit = res.data.data.benifit;
                });
                this.cancelSaveBenifit();
            });
        }
    }

    cancelSaveBenifit() {
        this['edit_benifit'] = false;
        this['benifitEdit'] = !this['benifitEdit'];
        let benifit_item = this.benifit_msg.get('benifit') as FormArray;
        for (let i = benifit_item.length; i >= 0; i--) {
            benifit_item.removeAt(i);
        }
        this.benifit_chosen.splice(0, this.benifit_chosen.length);
        this.benifits_name.splice(0, this.benifits_name.length);
    }

    editPay(class_state, form_obj, source_data, post_url, ...arg: Array<any>) {
        if (this.pay_msg.get('same_with_baspay').value) {
            const yg_sallay = this.pay_msg.get('yg_sallay').value;
            this.pay_msg.get('yg_try_sallay').setValue(yg_sallay);
        }
        this.saveForm(class_state, form_obj, source_data, post_url, arg);
    }

    showHospital(args) {
        this.staff_info_base['hospital'] = args;
    }

// 删除当前工作、教育经历、家庭情况
    delet(i, id, ajaxData, ajaxUrl) {
        this.showModal('deleteForm');
        // this.current_target = 'deleteForm';
        this.modal_args = [i, id, ajaxData, ajaxUrl];
    }

// 编辑当前工作、教育经历 家庭情况
    edit(i, id, string_arg) {
        let value;
        this['current'][`${string_arg}`] = i;
        this['current_id'][`${string_arg}`] = id;
        this[`show_${string_arg}_panel`] = true;
        // 视图赋值给表单
        for (const obj in this[`${string_arg}_msg`].controls) {
            if (obj === 'rel_id') {
                value = this[`staff_info_${string_arg}s`][i][obj];
                this.staff_setting_data.rel_id.map((val) => {
                    if (value === val.id) {
                        this[`${string_arg}_msg`].controls[obj].setValue([{
                            id: val.id,
                            name: val.name
                        }]);
                    }
                });
            } else if (obj === 'record') {
                value = this[`staff_info_${string_arg}s`][i][obj];
                this.staff_setting_data.yg_xueli.map((val) => {
                    if (value === val.id) {
                        this[`${string_arg}_msg`].controls[obj].setValue([{
                            id: val.id,
                            name: val.name
                        }]);
                    }
                });
            } else {
                value = this[`staff_info_${string_arg}s`][i][obj];
                this[`${string_arg}_msg`].controls[obj].setValue(value);
            }
        }
        // this.setPicker(`#edit_${string_arg}_start`, `#edit_${string_arg}_end`);
    }


// 教育、工作、家庭保存经历处理表单
    sendRequest(item_name, msg_obj: Object = {}) {
        let submit_obj = {};
        const id = this.current_id[item_name];
        const i = this.current[item_name];
        const submit_item = this.upperFirstStr(item_name);
        const formdata_str = `${item_name}_msg`;
        const request_func_name = i == -2 ? `add${submit_item}` : `update${submit_item}`;
        this.beforesubmit[`${item_name}_msg`] = false;
        if (this[formdata_str].valid) {
            this.is_edit = true;
            Object.keys(this[formdata_str].value)
                .forEach((item) => {
                    // if (this[formdata_str].value[item] !== '') {
                        submit_obj[item] = this[formdata_str].value[item];
                    // }
                });
            submit_obj['yg_id'] = this.user_id;
            if (submit_obj.hasOwnProperty('rel_id') && submit_obj['rel_id']) {
                submit_obj['rel_id'] = submit_obj['rel_id'][0].id;
            }
            if (submit_obj.hasOwnProperty('record') && submit_obj['record']) {
                submit_obj['record'] = submit_obj['record'][0].id;
            }
            // 发送保存数据请求
            if (i == -2) {
                this.staffDetailService[request_func_name](submit_obj).subscribe((res) => {
                    const new_data = this.setPageData({}, res);
                    this[`staff_info_${item_name}s`].push(new_data);
                    this[`show_${item_name}_panel`] = true;
                    this.is_edit = false;
                    this[`${item_name}_msg`].reset('');
                    this.current[`${item_name}`] = -1;
                    this.beforesubmit[`${item_name}_msg`] = true;
                });
            } else {
                this.staffDetailService[request_func_name](id, submit_obj).subscribe((res) => {
                    const new_data = this.setPageData(msg_obj[i], res);
                    this.current[`${item_name}`] = -1;
                    this.current_id[`${item_name}`] = -1;
                    this[`staff_info_${item_name}s`][i] = new_data;
                    this.is_edit = false;
                    this.beforesubmit[`${item_name}_msg`] = true;
                });
            }
        }
    }

    setPageData(msg_obj, res) {
        for (const obj in res.data['data']) {
            if (obj === 'record') {
                for (let i = 0; i < this.staff_setting_data.yg_xueli.length; i++) {
                    if (this.staff_setting_data.yg_xueli[i]['id'] == res.data['data'][obj]) {
                        msg_obj[`${obj}_name`] = this.staff_setting_data.yg_xueli[i].name || '';
                    }
                }
            } else if (obj === 'rel_id') {
                for (let i = 0; i < this.staff_setting_data.rel_id.length; i++) {
                    if (this.staff_setting_data.rel_id[i]['id'] == res.data['data'][obj]) {
                        msg_obj[`rel_name`] = this.staff_setting_data.rel_id[i].name || '';
                    }
                }
            }
            msg_obj[obj] = res.data['data'][obj];
        }
        return msg_obj;
    }

    // 取消编辑当前经历（家庭成员 / 教育经历 / 工作经历）
    cancelEditlForm(string_arg) {
        this['current'][`${string_arg}`] = -1;
    }

// 增加一条家庭记录
    addFamily() {
        this.family_msg = this.fb.group({
            name: ['', Validators.required],
            rel_id: ['', Validators.required],
            company_name: [''],
            title: [''],
            phone: ['', phoneValid],
            id: [''],
            yg_id: ['']
        });
        this.current.family = -2;
        // this.current = false;
    }

// 增加一条教育经历
    addEducation() {
        this.education_msg = this.fb.group({
            school_name: ['', Validators.required],
            major: [''],
            record: [''],
            in_at: [''],
            out_at: [''],
            id: [''],
            yg_id: [''],
            degree: ['']
        });
        this.current.education = -2;
    }

// 增加一条工作经历
    addWork() {
        this.work_msg = this.fb.group({
            company_name: ['', Validators.required],
            title: [''],
            prove_name: [''],
            prove_email: ['', mailValid],
            prove_phone: ['', phoneValid],
            in_at: [''],
            out_at: ['']
        });
        this.current.work = -2;
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
        this.yg_direction.setValue('');
        this.social_msg.get('yg_city').setValue('');
        for (const pro of this.area_list.province_list) {
            if (pro.id == event.id) {
                this.area_list.direction_list = JSON.parse(JSON.stringify(pro.children));
                // console.log(this.city_list);
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
        console.log(event);
        console.log(this.social_msg.get('yg_city').value);
        this.social_msg.get('yg_city').setValue('');
        for (const city of this.area_list.direction_list) {
            if (city.id == event.id) {
                this.area_list.city_list = JSON.parse(JSON.stringify(city.children));
                console.log(city);
                console.log(this.area_list.city_list);
            }
        }
    }

    refreshCity(event) {
        setTimeout(() => {
            console.log(234234);
            let hk_type = this.social_msg.get('yg_hk_type').value[0].id;
            this.city_id = event.id;
            if (this.city_id && this.social_msg.get('yg_hk_type').value) {
                this.social_msg.get('social_rule').setValue('');
                this.social_msg.get('fund_rule').setValue('');
                this.social_placeholder = '填写缴纳基数';
                this.fund_placeholder = '填写缴纳基数';
                this.social_msg.get('yg_social_self')
                    .clearValidators();
                this.social_msg.get('yg_fund_self')
                    .clearValidators();
                if (hk_type !== '' && this.city_id !== '') {
                    this.staffUploadService.addSocialRule(this.city_id, hk_type).subscribe((res) => {
                        this.social_rule = res.data;
                    });
                }
                if (this.city_id !== '') {
                    this.staffUploadService.addSocialSetting(this.city_id).subscribe((res) => {
                        this.social_base_settings = res.data;
                    });
                    this.staffUploadService.addSocialRange(this.city_id).subscribe((res) => {
                        this.social_range = res.data;
                    });
                }
                this.getCitySocial();
                this.getCityFund();
            }
        });
    }

    /**
     * setSocialSettings
     * 函数描述
     * 请求社保公积金基本配置、公积金起缴范围
     * @params:
     * @return:
     */
// 请求社保公积金基本配置、公积金起缴范围
    setSocialSettings(is_arg_changed: boolean = true) {
        setTimeout(() => {
            let hk_type = this.social_msg.get('yg_hk_type').value[0].id;
            this.city_id = this.social_msg.get('yg_city').value[0].id;
            if (this.social_msg.get('yg_city').value && this.social_msg.get('yg_hk_type').value) {
                if (is_arg_changed) {
                    this.social_msg.get('social_rule').setValue('');
                    this.social_msg.get('fund_rule').setValue('');
                }
                this.social_placeholder = '填写缴纳基数';
                this.fund_placeholder = '填写缴纳基数';
                this.social_msg.get('yg_social_self')
                    .clearValidators();
                this.social_msg.get('yg_fund_self')
                    .clearValidators();
                if (this.city_id !== '') {
                    this.staffUploadService.addSocialSetting(this.city_id).subscribe((res) => {
                        this.social_base_settings = res.data;
                    });
                    this.staffUploadService.addSocialRange(this.city_id).subscribe((res) => {
                        this.social_range = res.data;
                    });
                    if (hk_type !== '') {
                        this.staffUploadService.addSocialRule(this.city_id, hk_type).subscribe((res) => {
                            this.social_rule = res.data;
                            console.log(this.social_rule);
                            this.getCitySocial();
                            this.getCityFund();
                        });
                    }
                }
            }
        });
    }

// 社保基数
    getCitySocial(event = '') {
        setTimeout(() => {
            console.log(event);
            console.log(this.social_msg.get('social_rule').value);
            if (!this.isEmptySelect(event) || !this.isEmptySelect(this.social_msg.get('social_rule').value)) {
                if (this.social_msg.get('yg_city').value !== '') {
                    const city_id = this.social_msg.get('yg_city').value[0].id;
                    const social_rule = this.isEmptySelect(event) ? this.social_msg.get('social_rule').value[0].id : event['id'];
                    console.log(city_id, social_rule);
                    this.staffUploadService.getCitySocial(city_id, social_rule).subscribe((res) => {
                        console.log(res);
                        this.base_money['social_high'] = Number(res.data.max);
                        this.base_money['social_low'] = Number(res.data.min);
                        this.social_placeholder = `建议${this.base_money['social_low'].toFixed(2)}~${this.base_money['social_high'].toFixed(2)}`;
                        this.social_msg.get('yg_social_self')
                            .setValidators(socialBase(this.base_money['social_low'].toFixed(2), this.base_money['social_high'].toFixed(2)));
                    });
                }
            }
        });
    }

// 公积金基数
    getCityFund(event = '') {
        setTimeout(() => {
            if (event || this.social_msg.get('fund_rule').value !== '') {
                if (this.social_msg.get('yg_city').value !== '') {
                    const city_id = this.social_msg.get('yg_city').value[0].id;
                    const fund_rule = this.isEmptySelect(event) ? this.social_msg.get('fund_rule').value[0].id : event['id'];
                    this.staffUploadService.getCityFund(city_id, fund_rule).subscribe((res) => {
                        this.base_money['fund_high'] = Number(res.data.max);
                        this.base_money['fund_low'] = Number(res.data.min);
                        this.fund_placeholder = `建议${this.base_money['fund_low'].toFixed(2)}~${this.base_money['fund_high'].toFixed(2)}`;
                        this.social_msg.get('yg_fund_self')
                            .setValidators(fundBase(this.base_money['fund_low'].toFixed(2), this.base_money['fund_high'].toFixed(2)));
                    });
                }
            }
        });
    }


    /**
     * isEmptySelect
     * 函数描述
     * 是否有有效值
     * @params:
     * @return:
     */
    // -->
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

    // <-----
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
            if (!this.social_msg.get(`${type}_low_base`).disabled) {
                console.log(this.social_msg.get(`${type}_low_base`).value);
                if (this.social_msg.get(`${type}_low_base`).value) {
                    this.social_msg.get(`yg_${type}_self`).setValue(this.base_money[`${type}_low`]);
                    this.social_msg.get(`yg_${type}_self`).disable();
                } else {
                    this.social_msg.get(`yg_${type}_self`).enable();
                }
            }
        });
    }

    setStartDate(options_obj, event) {
        if (options_obj === 'work_out_at') {
            this[options_obj] = Object.assign(JSON.parse(JSON.stringify(this[options_obj])), {
                start_time: event,
                start_time_type: 1
            });
        } else {
            this[options_obj] = Object.assign(JSON.parse(JSON.stringify(this[options_obj])), {
                start_time: event,
                start_time_type: 0
            });
        }
    }

// 记录请假缺勤
    absenceModal() {
        this.modal_name = 'absence';
        this.modal_info = {
            id: this.staff_info_base.id,
            name: this.staff_info_base.yg_name
        };
        this.modal_callback = () => {
            this.toAttendanceLog();
        }
    }


// 记录加班
    overtimeModal() {
        this.modal_name = 'overtime';
        this.modal_info = {
            id: this.staff_info_base.id,
            name: this.staff_info_base.yg_name
        };
        this.modal_callback = () => {
            this.toAttendanceLog();
        }
    }

    /**
     * refreshParentBank()
     * 函数描述
     * 开户行异步事件触发
     * @params:
     * event 被发射时间
     * @return:
     * 无
     */
    refreshParentBank(value) {
        this.banks_page = 1;
        console.log(value);
        // this.excel_choose = false;
        if (value.id) {
            this.bank_id = value.id;
            this.bank_name = value.name;
        }
        this.staffDetailService.getYgOpenbankMsg({
            name: '',
            bank_id: this.bank_id,
            page: this.banks_page
        }).subscribe((res) => {
            this.account_msg.get('bank_sub_code').setValue('');
            console.log(res);
            this.sub_banks = [];
            res.data.data.map((item) => {
                this.sub_banks.push({
                    id: item.bank_code,
                    name: item.bank_name
                });
            });
        });
        // let str = value.join('');
        // this.setValue();
    }

    refreshSubValue(value) {
        if (value.id) {
        }
    }

    asyncChildBank(value) {
        console.log(value);
        if (value.waterfall) {
            this.banks_page++;
            this.staffDetailService.getYgOpenbankMsg({
                name: value.search,
                bank_id: this.bank_id,
                page: this.banks_page
            }).subscribe((res) => {
                const tmp_arr = [];
                console.log(res);
                res.data.data.map((item) => {
                    tmp_arr.push({
                        id: item.bank_code,
                        name: item.bank_name
                    });
                });
                console.log(tmp_arr);
                this.sub_banks_async = tmp_arr;
            });
        } else {
            this.banks_page = 1;
            this.staffDetailService.getYgOpenbankMsg({
                name: value.search,
                bank_id: this.bank_id,
                page: this.banks_page
            }).subscribe((res) => {
                const tmp_arr = [];
                console.log(res);
                res.data.data.map((item) => {
                    tmp_arr.push({
                        id: item.bank_code,
                        name: item.bank_name
                    });
                });
                console.log(tmp_arr);
                this.sub_banks = tmp_arr;
            });
        }
    }

    /**
     * editStaffBaseInfo;
     * 函数描述
     * 编辑基本信息
     * @params:
     * @return:
     */
    editStaffBaseInfo(class_state, form_obj, source_data, arg) {
        for (let obj in form_obj.controls) {
            let value;
            if (obj === arg) {
                for (let item in form_obj.controls[obj].controls) {
                    if (source_data[item].hasOwnProperty('id')) {
                        form_obj.controls[arg].controls[item].setValue([source_data[item]]);
                    } else {
                        form_obj.controls[arg].controls[item].setValue(source_data[item]);
                    }
                }
            } else if (!form_obj.controls[obj].controls) {
                if (source_data[obj].hasOwnProperty('id')) {
                    form_obj.controls[obj].setValue([source_data[obj]]);
                } else {
                    form_obj.controls[obj].setValue(source_data[obj]);
                }
            }
        }
        this[class_state] = true;
    }

    toStaffRehire() {
        this.router.navigate([`/user/staff/staff-detail/${this.user_id}/operate/staff-rehire`]);
    }

    toStaffChangeLog() {
        this.router.navigate([`/user/staff/staff-detail/${this.user_id}/operate/staff-change-log`]);
    }

    toStaffChange() {
        this.router.navigate([`/user/staff/staff-detail/${this.user_id}/operate/staff-change/${this.staff_info_base.yg_name}`]);
    }

    toAttendanceLog() {
        this.router.navigate([`/user/staff/staff-detail/${this.user_id}/operate/staff-attendance-log`]);
    }

// 添加福利
    deleteBenifit(index, obj) {
        const delete_form = this.benifit_msg.get(obj) as FormArray;
        delete_form.removeAt(index);
        this.staff_setting_data.hr_gs_benifit.map(val => {
            if (val.id == this.benifit_chosen[index]) {
                val['_status_'] = 1;
            }
        });
        this.benifit_chosen.splice(index, 1);
        this.benifits_name.splice(index, 1);
    }

    showBenifits() {
        this.is_add_benifit = !this.is_add_benifit;
    }

    addBenifit(event) {
        console.log(event);
        let tmp_obj = {};
        this.staff_setting_data.hr_gs_benifit.map(val => {
            if (val.id == event.id) {
                tmp_obj = val;
                val['_status_'] = 0;
            }
        });

        let form_group = new FormBuilder().group({
            be_id: [{value: tmp_obj['id'], disabled: false}],
            money: [{value: tmp_obj['money'], disabled: false}, [requireDeci]]
        });
        const new_array = this.benifit_msg.get('benifit') as FormArray;
        this.is_add_benifit = !this.is_add_benifit;
        this.benifits_name.push(tmp_obj['name']);
        this.benifit_chosen.push(tmp_obj['id']);
        new_array.push(form_group);
    }

    cancelBenifit() {
        this.is_add_benifit = !this.is_add_benifit;
    }

    // 下载PDF
    downloadContract() {
        window.open(`${this.staffsService.downloadContract()}?id=${this.staff_info_base.id}&token=${window.localStorage.getItem('mayihr_token')}`);
    }
    downloadStopContract() {
        window.open(`${this.staffsService.downloadStopContract()}?id=${this.staff_info_base.id}&token=${window.localStorage.getItem('mayihr_token')}`);
    }
}
export class TabType {
    constructor(public title: string, public target: ElementRef) {
    }
}
