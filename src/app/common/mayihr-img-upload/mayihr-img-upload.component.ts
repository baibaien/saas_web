import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssistModalService} from "../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'mayihr-img-upload',
    templateUrl: './mayihr-img-upload.component.html',
    styleUrls: ['./mayihr-img-upload.component.less']
})
export class MayihrImgUploadComponent implements OnInit {
    @Input()
    img_url;
    @Input()
    img_config;

    @Output()
    uploadImage = new EventEmitter();
    @Output()
    deleteImage = new EventEmitter();
    // -->
    public img_config_default = {
        title: '请上传图片',
        allow_reload: true,
        allow_clear: true,
        allow_upload: false,
        max_size: 5
    };
    // <-----

    public show_preview;

    constructor(public assistModalService: AssistModalService) {
    }

    ngOnInit() {
        this.img_config = Object.assign(this.img_config_default, this.img_config);
    }

    /**
     * resetForm
     * 函数描述
     *
     * @params:
     * @return:
     */
    resetForm(event) {
        event.reset();
    }

    emitImg(event) {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0]);
            console.log(event.target.files[0].size);
            if (event.target.files[0].size / 1024 / 1024 > this.img_config.max_size) {
                this.assistModalService.openAssistModal('alert', `图片大小不得超过${this.img_config.max_size}MB`);
            } else {
                this.uploadImage.emit(event.target.files[0]);
            }
        }
    }

    /**
     * previewImg
     * 函数描述
     *
     * @params:
     * @return:
     */
    previewImg() {
        this.show_preview = true;
    }

    cancelPreview() {
        this.show_preview = false;
    }

    /**
     * deleteImg
     * 函数描述
     *
     * @params:
     * @return:
     */
    deleteImg() {
        this.deleteImage.emit(true);
    }


    /**
     * reUploadImg
     * 函数描述
     *
     * @params:
     * @return:
     */
    reUploadImg(event) {
        // console.log(event);
        event.click();
    }


}
