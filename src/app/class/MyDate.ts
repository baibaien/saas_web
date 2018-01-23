export class MyDate {
    public date: Date;

    constructor(time?: number) {
        if (time) {
            this.date = new Date(time);
        } else {
            this.date = new Date();
        }
    }
    setDate(year: number, month?: number, day?: number) {
        return this.date.setFullYear(year, month - 1, day);
    }
    getTime() {
        return this.date.getTime();
    }
    // -->获取日期
    // 初步规划为两个参数，格式和显示到什么级别
    // 其中range表示显示到什么级别，第一版本只支持到日,
    // range接受字符串作为参数,month表示到月,day表示到日
    // 默认到日
    // type表示显示类型，第一版支持yyyy-mm-dd， yyyy年m月d日
    // en表示英语，cn表示汉语
    // 默认英语
    getDate(date?: MyGetDateForm) {
        let range: string;
        let type: string;
        if (arguments.length === 0) {
            range = 'day';
            type = 'en';
        } else {
            ({range = 'day', type = 'cn'} = date);
        }
        let date_str;
        const year = this.date.getFullYear();
        const month = this.formatNumber(this.date.getMonth() + 1);
        const day = this.formatNumber(this.date.getDate());
        if (range === 'day') {
            date_str = `${year}-${month}-${day}`;
        } else if (range === 'month') {
            date_str = `${year}-${month}`;
        } else if (range === 'year') {
            date_str = `${year}`;
        } else {
            throw new Error(`Argument 'range' only accepts 'year', 'month' or 'day'`);
        }
        if (type === 'en') {
            return date_str;
        } else if (type === 'cn') {
            const tmp_arr = date_str.split('-');
            date_str = '';
            const tmp_unit = ['年', '月', '日'];
            for (let i in tmp_arr) {
                date_str += `${tmp_arr[i]}${tmp_unit[i]}`;
            }
            return date_str;
        } else {
            throw new Error(`Argument 'type' only accepts 'en' or 'cn`);
        }
    }

    // <-----

    // -->在当前日期的基础上进行加减，第一版对年月日进行操作
        //第一个参数为更改的数量
        //type表示操作的级别，默认为日，
    calcDate(num: number, type?: string): MyDate {
        type = type || 'day';
        return new MyDate();
    }
    // <-----



    // -->将个位数转换为0起头的字母串
    public formatNumber(num: number): string {
        if (num < 10 && num > 0) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }
    // <-----

}
interface MyGetDateForm {
    range?: string;
    type?: string;
}
