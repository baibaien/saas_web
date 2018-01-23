import {Injectable} from '@angular/core';
import {isUndefined} from "util";

@Injectable()
export class DateService {
    public now;

    constructor() {
        this.now = new Date();

    }

    // 获取当前时间
    getDateNow(type?: string, adjust?: number) {
        const test = new Date();
        if (adjust >= 0) {
            test.setDate(this.now.getDate() + adjust);
        } else if (adjust == -1) {
            test.setFullYear(this.now.getFullYear(), 11, 31);
        }
        const year = test.getFullYear();
        const month = test.getMonth() + 1;
        const day = test.getDate();
        if (type === 'day' || isUndefined(type)) {
            let tmp;
            if (month < 10) {
                tmp = `${year}-0${month}-`;
            } else {
                tmp = `${year}-${month}-`;
            }
            if (day < 10) {
                tmp += `0${day }`;
            } else {
                tmp += `${day}`;
            }
            return tmp;
        } else if (type === 'month') {
            if (month < 10) {
                return `${year}-0${month}`;
            } else {
                return `${year}-${month}`;
            }
        } else if (type === 'year') {
            return `${year}`;
        }
    }

    // -->
    formatTimeStamp(time, range = 'day', separator = '-') {
        console.log(time);
        let sep;
        const tmp_date = new Date();
        if (separator != 'cn') {
            sep = [separator, separator, separator];
        } else {
            sep = ['年', '月', '日'];
        }
        tmp_date.setTime(time * 1000);
        const year = tmp_date.getFullYear();
        const month = tmp_date.getMonth() + 1;
        const day = tmp_date.getDate();
        if (range === 'day' || isUndefined(range)) {
            let tmp;
            if (month < 10) {
                tmp = `${year}${sep[0]}0${month}${sep[1]}`;
            } else {
                tmp = `${year}${sep[0]}${month}${sep[1]}`;
            }
            if (day < 10) {
                if (sep[2] == '日') {
                    tmp += `0${day}${sep[2]}`;
                } else {
                    tmp += `0${day}`;
                }
            } else {
                if (sep[2] == '日') {
                    tmp += `${day}${sep[2]}`;
                } else {
                    tmp += `${day}`;
                }
            }
            return tmp;
        } else if (range === 'month') {
            if (month < 10) {
                return `${year}${sep[0]}0${month}${sep[1] == '月' ? sep[1] : ''}`;
            } else {
                return `${year}${sep[0]}${month}${sep[1] == '月' ? sep[1] : ''}`;
            }
        } else if (range === 'year') {
            return `${year}`;
        }
    }

    // <-----
    // 小时int转换为合理的string
    timetoggle(data) {
        if (data % 8 == 0) {
            return `${Math.floor(data / 8)}天`;
        } else if (data > 7) {
            return `${Math.floor(data / 8)}天${data % 8}小时`;
        } else if (data < 8) {
            return `${data % 8}小时`;
        }
    }



    // -->生成时间戳
    createTimeStamp(date: Date) {
        return Math.floor(date.getTime() / 1000);
    }
    // <-----
}
