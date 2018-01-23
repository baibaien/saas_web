import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class ImgService {

    constructor(public httpService: HttpService) {
    }


    /**
     * createImgUpObservable
     * 函数描述
     * 创建一个上传图片的请求
     * @params: file--- type----- yg_id
     * @return:
     */
    createImgUpObservable(file, type, url, yg_id?) {
        console.log(yg_id);
        console.log(file);
        const form_data = new FormData();
        form_data.append('file', file);
        form_data.append('type', type);
        if (!!yg_id) {
            form_data.append('yg_id', yg_id);
        }
        const header = new Headers();
        header.append('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
        return this.httpService.myPost(url, form_data, {headers: header});
    }

    /**
     * createImgConfig
     * 函数描述
     * 生成config对象
     * @params: title
     *          type????暂时不处理
     * @return:
     */
    createImgConfig(title) {
        return {
            title: title,
            allow_reload: true,
            allow_clear: true
        };
    }
}
