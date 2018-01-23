// -->日期变为[年，月，日]
import {isNullOrUndefined} from "util";
export function dateToArr(value?: Date, type: string = 'day'): number[] {
    const output_date = [];
    if (value) {
        if (type === 'day') {
            output_date.unshift(value.getDate());
            output_date.unshift(value.getMonth());
            output_date.unshift(value.getFullYear());
        } else if (type === 'month') {
            output_date.unshift(1);
            output_date.unshift(value.getMonth());
            output_date.unshift(value.getFullYear());
        } else if (type === 'year') {
            output_date.unshift(1);
            output_date.unshift(0);
            output_date.unshift(value.getFullYear());
        }
    } else {
        const date_now = new Date();
        return [date_now.getFullYear(), date_now.getMonth(), date_now.getDate()];
    }
    return output_date;
}
// <-----


// --> [年，月，日]变为日期
export function arrToDate(value: number[], type?: 'month' | 'year'): Date {
    if (type) {
        if (type === 'month') {
            return new Date(value[0], value[1], 1);
        } else if (type === 'year') {
            return new Date(value[0], 0, 1);

        }
    } else {
        return new Date(value[0], value[1], value[2]);

    }
}
// <-----

// -->'年-月-日' 变为日期
export function strToDate(str: string) {
    if (isNullOrUndefined(str) || str === '') {
        return new Date();
    } else {
        const arr: any[] = str.split('-');
        if (arr.length === 3) {
            arr.map((value, index) => {
                arr[index] = Number(value);
            });
            return new Date(arr[0], arr[1] - 1, arr[2]);
        } else if (arr.length === 2) {
            arr.map((value, index) => {
                arr[index] = Number(value);
            });
            return new Date(arr[0], arr[1] - 1, 1);
        }
    }
}
// <-----
// -->'年-月-日'转换为[年，月，日]
export function strToArr(str: string) {
    return str.split['-'];
}
// <-----
// -->日期转换为 '年-月-日'
export function dateToStr(date: Date): string {
    return `${date.getFullYear()}-${isMore(date.getMonth() + 1)}-${isMore(date.getDate())}`;
}
// <-----
// -->是否大于10，字符串转换
export function isMore(data: number) {
    return data < 10 ? `0${data}` : `${data}`;
}
// <-----


// -->格式转换为行列阵的二维结构
export function arrSplit(data, range) {
    const view_arr = [];
    let j = -1;
    for (let i = 0; i < data.length; i++) {
        if (i % range === 0 || j === -1) {
            j++;
            view_arr[j] = [];

        }
        view_arr[j].push(data[i]);
    }

    return view_arr;
}
// <-----

// -->进位转换
export function monthChangeYear(year, month) {
    if (month < 0) {
        return [year - 1, 11];
    }
    if (month > 11) {
        return [year + 1, 0];
    } else {
        return [year, month];
    }
}
// <-----
