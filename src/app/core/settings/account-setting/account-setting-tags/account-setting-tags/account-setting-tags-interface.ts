/**
 * Created by Bonan on 2017/10/16.
 */
export interface AccountSettingsTagsAsyncData {
    sign_info: object;
    outsource_contract: {
        back_preview?: string,
        back_thumbnail?: string,
        front_preview?: string,
        front_thumbnail?: string
    };
    addr: {
        province: AreaData[]
        city: AreaData[]
        district: AreaData[]
    };
    pic_url: object;
    [propName: string]: any;
}


interface AreaData {
    id: string | number;
    name: string;
    [propName: string]: any;
}
