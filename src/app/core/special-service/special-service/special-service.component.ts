import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {SpecialServiceApiService} from "../../../shared/service/api-service/special-service-api/special-service-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {isUndefined} from "util";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-special-service',
    templateUrl: './special-service.component.html',
    styleUrls: ['./special-service.component.css']
})
export class SpecialServiceComponent implements OnInit, OnDestroy {
    public tags: object[];
    // <-----
    // -->流订阅/取消订阅
    public list_info_emitter;
    public current_url;
    public pre_url;
    // <-----

    // -->
    // <-----

    // -->
    public modal_name;
    public modal_info;
    public modal_name_emitter;
    public modal_info_emitter;
    // <-----


    // -->列表数据
    public service_list;
    // <-----

    public test;

    constructor(public globalFuncService: GlobalFuncService,
                public specialServiceApiService: SpecialServiceApiService,
                public assistModalService: AssistModalService,
                public router: Router,
                public modalService: ModalService,
                public httpService: HttpService) {
        document.title = '专项服务';
        this.list_info_emitter = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log(data1);
                if (!isUndefined(data1.data.info)) {
                    this.service_list = JSON.parse(JSON.stringify(data1.data.info));
                    console.log(this.service_list);
                    for (const i of this.service_list) {
                        for (const j of i.special_service) {
                            for (const k of j.cityPrice) {
                                k.id = [k.city_id, k.service_id];
                                k.name = `${k.city_name}(${k.price})元/${j.unit == 1 ? '人' : '次'}`;
                            }
                        }
                    }
                } else {
                    this.service_list = [];
                }
                // -->城市业务费用列表转换为可用的格式
                console.log(this.service_list);
                // <-----
            });
        });
        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.httpService.myGet(this.specialServiceApiService.getServiceType())
            .subscribe(data => {
                console.log(data);
                this.current_url = this.specialServiceApiService.getServiceList(data.data[0].id);
                this.tags = JSON.parse(JSON.stringify(data.data));
                this.globalFuncService.resetSubmitData();
                this.globalFuncService.setInfoListSource('get', this.current_url, {});
                this.globalFuncService.emitInfoListSource();
            });
    }

    ngOnDestroy() {
        this.list_info_emitter.unsubscribe();
        this.modal_name_emitter.unsubscribe();
        // this.modal_info_emitter.unsubscribe();
    }

    refreshValue(event, child) {
        if (event !== '') {
            child.city_select = event.id;
            console.log(child);
        }
    }

    // -->选大类标签
    chooseTag(i) {
        console.log(i);
        this.current_url = this.specialServiceApiService.getServiceList(i.id);
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.current_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    // <-----

    // -->查看详情
    checkDetailInfo(item) {
        this.modal_name = 'service_detail_info';
        this.modal_info = item.id;
    }

    // <-----
    // -->办理
    submitService(service, index) {
        this.modal_info = service.city_select;
        console.log(service);
        console.log(index);
        if (service.city_select) {
            if (service.unit == 1) {
                console.log(123123);
                this.modal_name = 'staff_service';
            } else {
                this.httpService.myPost(this.specialServiceApiService.getPayService(), {
                    yg_id: 0,
                    city_id: service.city_select[0],
                    id: service.city_select[1]
                }).subscribe(data => {
                    this.assistModalService.openAssistModal('toast', '办理成功', () => {
                        this.toMyService();
                    });
                });
            }
        } else {
            this.assistModalService.openAssistModal('alert', '请选择城市');
        }
    }

    // <-----
    // -->
    toMyService() {
        this.router.navigate(['./user/special-service/paid']);
    }

    // <-----

}
