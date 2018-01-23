import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {Headers} from "@angular/http";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-document-center',
    templateUrl: './document-center.component.html',
    styleUrls: ['./document-center.component.css'],
})
export class DocumentCenterComponent implements OnInit {
    public public_document;
    public public_document_pagination;


    public self_upload_document;
    public self_upload_document_pagination;


    public paging_config = {
        small_paging: true
    };

    constructor(public usersService: UsersService,
                public assistModalService: AssistModalService,
                public httpService: HttpService) {
        document.title = '常用文档';

    }

    ngOnInit() {
        this.getPublicDocRequest();
        this.getSelfUploadDocRequest();
    }

    getPublicDocRequest(submit_data = {}) {
        this.httpService.myGet(this.usersService.getDocumentCenter(), submit_data)
            .subscribe(data => {
                console.log(data);
                this.public_document = data.data.data;
                this.public_document_pagination = data.data.meta.pagination;
            });
    }

    getSelfUploadDocRequest(submit_data = {}) {
        this.httpService.myGet(this.usersService.getSelfUploadDoc(), submit_data)
            .subscribe(data => {
                this.self_upload_document = data.data.data;
                this.self_upload_document_pagination = data.data.meta.pagination;
            });
    }

    publicPagingRefresh(event) {
        this.getPublicDocRequest({search: event});
    }

    selfPagingRefresh(event) {
        console.log(event);
        this.getSelfUploadDocRequest({search: event});
    }

    downloadFile(doc) {
        console.log(doc);
        this.httpService.myGet(this.usersService.getDownloadDoc(), {search: {id: doc.id}})
            .subscribe(data => {
                console.log(data);
                window.open(data.data.url);
            });
    }

    deleteSelfFile(doc) {
        this.assistModalService.openAssistModal('confirm', '文档删除后无法恢复，您确定要删除该文档么？', () => {
            this.httpService.myDelete(`${this.usersService.getDeleteSelfDoc()}/${doc.id}`)
                .subscribe(data => {
                    console.log(data);
                    this.assistModalService.openAssistModal('toast', '删除成功', () => {
                        this.getSelfUploadDocRequest();
                    });
                });
        });
    }

    /**
     * uploadDoc
     * 函数描述
     * 上传文档
     * @params:
     * @return:
     */
    uploadDoc() {
        document.getElementById('doc_upload').click();
    }

    resetForm(event) {
        event.reset();
    }

    fileInputClick(event) {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0]);
            if (event.target.files[0].size / 1024 / 1024 > 5) {
                this.assistModalService.openAssistModal('alert', `图片大小不得超过5MB`);
            } else {
                const headers = new Headers();
                const form_data = new FormData();
                form_data.append('file', event.target.files[0]);
                headers.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
                this.httpService.myPost(this.usersService.getUploadDoc(), form_data, {headers: headers})
                    .subscribe(data => {
                        this.getSelfUploadDocRequest();
                    });
            }
        }
    }
}
