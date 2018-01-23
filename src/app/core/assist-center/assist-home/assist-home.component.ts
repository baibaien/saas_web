import {Component, OnDestroy, OnInit} from '@angular/core';
import {AssistCenterApiService} from "../../../shared/service/api-service/assist-center-api/assist-center-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {FormBuilder} from "@angular/forms";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../shared/service/login/login.service";

@Component({
    selector: 'app-assist-home',
    templateUrl: './assist-home.component.html',
    styleUrls: ['./assist-home.component.less']
})
export class AssistHomeComponent implements OnInit, OnDestroy {
    public question_list;
    public message;

    public box_choose = 1;


    public message_list_emitter;
    public message_list;
    public pagination;


    // -->
    public modal_name;
    public modal_info;
    public modal_name_emitter;
    // <-----


    public contract_info;

    constructor(public httpService: HttpService,
                public fb: FormBuilder,
                public router: Router,
                public modalService: ModalService,
                public loginService: LoginService,
                public assistCenterApiService: AssistCenterApiService,
                public globalFuncService: GlobalFuncService,
                public assistModalService: AssistModalService) {
        this.loginService.checkToken();
        document.title = '帮助中心';
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });

        this.message_list_emitter = this.globalFuncService.getInfoListEmit()
            .subscribe(data => {
                data.subscribe(data1 => {
                    console.log(data1);
                });
            });


        this.message = this.fb.group({
            type: ['3'],
            message: ['']
        });
    }

    ngOnInit() {
        this.httpService.myGet(this.assistCenterApiService.getTelephoneNum(), {})
            .subscribe(data => {
                console.log(data);
                this.contract_info = data.data;

            });
        this.httpService.myGet(this.assistCenterApiService.getAssistQuestion(), {search: {type: 1}})
            .subscribe(data => {
                console.log(data);
                this.question_list = data.data.data.filter((val, ind) => {
                    return ind < 6;
                });
                console.log(this.question_list);
            });
    }

    ngOnDestroy() {

    }

    toggleBox(i) {
        if (i !== this.box_choose) {
            this.box_choose = i;
            console.log(i);
            if (i == 2) {
                this.httpService.myGet(this.assistCenterApiService.getMessageList(), {
                    search: {
                        is_all_display: 0,
                        page: 1
                    }
                }).subscribe(data => {
                    console.log(data);
                    this.message_list = data.data.data;
                    this.pagination = data.data.meta.pagination;
                });
            } else {
                this.message_list = [];
            }
        }
    }
    refreshPaging(event) {
        this.httpService.myGet(this.assistCenterApiService.getMessageList(), {
            search: event
        }).subscribe(data => {
            console.log(data);
            this.message_list = data.data.data;
            this.pagination = data.data.meta.pagination;
        });
    }
    addMessage() {
        if (this.message.get('message').value.trim().length > 0) {
            console.log(this.message.value);
            this.httpService.myPost(this.assistCenterApiService.getAddMessage(), this.message.value)
                .subscribe(data => {
                    console.log(data);
                    this.message.reset({
                        type: '3',
                        message: ''
                    });
                    this.assistModalService.openAssistModal('toast', '提交成功');
                    this.toggleBox(2);
                });
        }
    }

    /**
     * toMsgDetail
     * 函数描述
     * open message detail
     * @params: i---index of message
     * @return:
     */
    toMsgDetail(i) {
        console.log(i);
        this.modal_name = 'assist_msg_detail_m';
        this.modal_info = i;
    }
    toAssistDetail(i) {
        console.log(i);
        this.router.navigate([`/assist/assist-list/${i.type}/${i.id}`]);
    }
}
