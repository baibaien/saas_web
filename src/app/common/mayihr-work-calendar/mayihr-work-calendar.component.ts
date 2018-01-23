import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../shared/service/modal/modal.service';
import {SalaryApiService} from '../../shared/service/api-service/salary-api/salary-api.service';
import {HttpService} from '../../shared/service/http-service/http.service';

@Component({
    selector: 'mayihr-work-calendar',
    templateUrl: './mayihr-work-calendar.component.html',
    styleUrls: ['./mayihr-work-calendar.component.css']
})
export class MayihrWorkCalendarComponent implements OnInit {
    @Input()
    modal_name;

    public date_obj;
    public _year;
    public _month;
    public _day;
    public _date_str;

    public tags = [];
    public view_data;
    public submit_data;


    public work_days;
    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public salaryApiService: SalaryApiService) {
    }

    ngOnInit() {
        this.date_obj = (function () {
            let _date = new Date();
            return {
                getDate: function () {
                    return _date;
                },
                setDate: function (date) {
                    _date = date;
                }
            };
        })();
        this._year = this.date_obj.getDate().getFullYear();
        this._month = this.date_obj.getDate().getMonth();
        this._date_str = this.getDateStr(this.date_obj.getDate());
        this.submit_data = this._date_str.substr(0, 7);
        this.view_data = this.createDateStrc();
        this.createTag();
        this.requestCalendar();
    }

    // -->日期转为字符串
    getDateStr(date) {
        const _year = date.getFullYear();
        let _month = date.getMonth() + 1;
        let _day = date.getDate();
        //
        _month = (_month > 9) ? ('' + _month) : ('0' + _month);
        _day = (_day > 9) ? ('' + _day) : ('0' + _day);
        return `${_year}-${_month}-${_day}`;
    }

    // <-----

    // -->生成数据结构
    createDateStrc() {
        const _first_day = new Date(this._year, this._month, 1);
        const date_offset = _first_day.getDay() === 0 ? 7 : _first_day.getDay();
        let calendar_arr = [];
        for (let i = 0; i < 42; i++) {
            let day_obj = {};
            const _this_day = new Date(this._year, this._month, i + 1 - date_offset);
            const _this_day_str = this.getDateStr(_this_day);
            day_obj['text'] = Number(_this_day_str.substr(8, 2));
            day_obj['all'] = _this_day_str;
            if (_this_day_str == this.getDateStr(new Date())) {    // 当前天
                day_obj['status'] = 'current_day';
            } else if (_this_day_str.substr(0, 7) == this.getDateStr(_first_day).substr(0, 7)) {
                day_obj['status'] = 'current_month';
            } else {    // 其他月
                day_obj['status'] = 'other_month';
            }
            calendar_arr.push(JSON.parse(JSON.stringify(day_obj)));
        }
        return this.arrSplit(calendar_arr);
    }

    arrSplit(data) {
        let view_arr = [];
        let j = -1;
        for (let i = 0; i < data.length; i++) {
            if (i % 7 == 0 || j == -1) {
                j++;
                view_arr[j] = [];

            }
            view_arr[j].push(data[i]);
        }
        return view_arr;
    }

    // <-----
    // -->头部月份生成
    createTag() {
        for (let i = -this._month - 1; i < 13 - this._month; i++) {
            this.tags[i + this._month + 1] = {};
            this.tags[i + this._month + 1]['date'] = this.getDateStr(new Date(this._year, this._month + i, 1));
            this.tags[i + this._month + 1]['view'] = Number(this.tags[i + this._month + 1]['date'].substr(-5, 2));
            (i === 0) ? this.tags[i + this._month + 1]['is_choosed'] = true : this.tags[i + this._month + 1]['is_choosed'] = false;
            if (i === -this._month - 1) {
                this.tags[i + this._month + 1]['status'] = 'previous_year';
            } else if (i === 12 - this._month) {
                this.tags[i + this._month + 1]['status'] = 'next_year';
            } else {
                this.tags[i + this._month + 1]['status'] = 'this_year';
            }
        }
    }

    // <-----

    // -->头部月份选择
    chooseMonth(index) {
        const choosed_month = this.tags[index];
        for (const tag in this.tags) {
            this.tags[tag]['is_choosed'] = false;
        }
        this.tags[index]['is_choosed'] = true;
        this._year = Number(choosed_month['date'].substr(0, 4));
        this._month = Number(choosed_month['date'].substr(5, 2)) - 1;
        this.view_data = this.createDateStrc();
        this.submit_data = choosed_month['date'].substr(0, 7);
        this.requestCalendar();
    }

    // <-----
    changeMonth(num) {
        const month_now = this.tags.filter((value, index, array) => {
            return value['is_choosed'];
        })[0];
        if ((month_now['status'] === 'previous_year' && num === -1) || (month_now['status'] === 'next_year' && num === 1)) {
            return false;
        } else if (month_now['status'] === 'previous_year' && num === 1) {
            this.chooseMonth(1);
        } else if (month_now['status'] === 'next_year' && num === -1) {
            this.chooseMonth(12);
        } else {
            this.chooseMonth(month_now['view'] + num);
        }
    }

    requestCalendar() {
        this.httpService.myGet(this.salaryApiService.getCalendar(this.submit_data))
            .subscribe((data) => {
            this.work_days = data.data.attendance_day;
                if (data.data.list.length) {
                    for (let i in data.data.list) {
                        for (let j in this.view_data) {
                            this.view_data[j].map((val, index) => {
                                if (val['all'] == data.data.list[i]['date']) {
                                    Object.assign(val, data.data.list[i]);
                                }
                            });
                        }
                    }
                }
            });
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
