import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {OrganizationsService} from "../../../shared/service/api-service/staff-directory/organizations/organizations.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";

@Component({
    selector: 'app-staff-org-strc',
    templateUrl: './staff-org-strc.component.html',
    styleUrls: ['./staff-org-strc.component.css']
})
export class StaffOrgStrcComponent implements OnInit, OnDestroy {
    public modal_name;
    public modal_info;

    public org_strc: DataType;

    public modal_emitter;
    public data_emitter;

    constructor(public modalService: ModalService,
                public organizationsService: OrganizationsService,
                public globalFuncService: GlobalFuncService) {
        document.title = '组织架构';
        this.data_emitter = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                this.modal_info = JSON.parse(JSON.stringify(data1.data.data));
                this.modalService.setModalName('');
                this.modalService.emitModalName();
                this.org_strc = this.getOrgTree(data1.data.data);
            });
        });
        this.modal_emitter = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.organizationsService.getOrganizations(), {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.modal_emitter.unsubscribe();
        this.data_emitter.unsubscribe();
    }

    orgAddModal() {
        this.modal_name = 'add_modal';
    }


    getOrgTree(data) {
        const id_array = [];
        const new_dataType = new DataType();
        const data_before = data;
        new_dataType.children = [];
        new_dataType.id = 0;
        data_before.map((val) => {
            if (val.id == 0) {
                new_dataType.name = val.name;
                new_dataType.children_count = val.children_count;
                new_dataType.staff_count = val.staff_count;
            }
        });
        const newArray: Array<DataType> = [];
        for (let i = 0; i < data_before.length; i++) {
            newArray.push(data_before[i]);
            newArray[i].children = [];
            id_array.push(data_before[i].id);
        }
        for (let k = id_array.length - 1; k >= 0; k--) {
            for (let j = newArray.length - 1; j >= 0; j--) {
                if (newArray[j].pid == id_array[k]) {
                    newArray[k].children.push(newArray[j]);
                }
            }
            if (newArray[k].pid == 0) {
                new_dataType.children.unshift(newArray[k]);
            }
        }
        return new_dataType;

    }
}


class DataType {
    constructor(public id?: number,
                public name?: string,
                public pid?: number,
                public children?: Array<Object>,
                public leader_id?: number,
                public leader_name?: string,
                public children_count?: number,
                public staff_count?: number) {
    }
}
