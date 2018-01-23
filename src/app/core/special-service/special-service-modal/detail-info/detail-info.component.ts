import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {SpecialServiceApiService} from "../../../../shared/service/api-service/special-service-api/special-service-api.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-detail-info',
    templateUrl: './detail-info.component.html',
    styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    public city_selected;
    public service_info;
    public city_list;

    public city = new FormControl('');

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public specialServiceApi: SpecialServiceApiService) {

    }

    ngOnInit() {
        this.httpService.myGet(this.specialServiceApi.getServiceAttr(this.modal_info))
            .subscribe(data => {
                this.service_info = data.data.service;
                this.city_list = data.data.city_list.map(val => {
                    val['name'] = val.city_name;
                    return val;
                });
                console.log(this.city_list);
                this.city.setValue([this.city_list[0]]);
                this.city_selected = this.city_list[0];
            });
    }

    selectCity(city) {
        // event.preventDefault();
        // event.stopPropagation();
        console.log(city);
        for (let i of this.city_list) {
            if (i.id == city.id) {
                this.city_selected = i;
            }
        }

    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
