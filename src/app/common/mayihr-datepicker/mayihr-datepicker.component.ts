import {Component, OnInit, forwardRef, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {arrSplit, arrToDate, dateToArr, dateToStr, isMore, monthChangeYear, strToDate} from './assist-func';
import {isNullOrUndefined, isUndefined} from "util";

interface MayihrDate {
    value?: string | number;
    text?: string | number;
    optional?: 0 | 1;
    month_type?: 0 | 1 | 2;
    checked?: 0 | 1;
    current_day?: 0 | 1;
    operable?: 0 | 1;
}
const DATE_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MayihrDatepickerComponent),
    multi: true
};
@Component({
    selector: 'mayihr-datepicker',
    templateUrl: './mayihr-datepicker.component.html',
    styleUrls: ['./mayihr-datepicker.component.css'],
    providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class MayihrDatepickerComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input()
    options;
    @Output()
    refreshValue = new EventEmitter();
    @Output()
    changeValue = new EventEmitter();
    public options_default = {
        min_view_mode: 2,   // 0年1月2日
        start_time: '',
        start_time_type: 0, //0,不包含，1包含
        end_time: '',
        output_type: 1      //1字符串
    };

    public disabled;
    // -->年月日变量声明
    public _decade;
    public _year;
    public _month;
    public _day;
    // <-----

    // -->选中的日期
    public _decade_selected;
    public _y_selected;
    public _m_selected;
    public _d_selected;
    public _date_selected;
    public _y_selected_pre;
    public _m_selected_pre;
    public _d_selected_pre;

    // <-----
    // -->页面显示
    public view_data;
    public show_datepicker = false;
    public view_mode;
    public view_options;
    // <-----
    // -->月份数据
    public view_month;
    // 年
    public view_year = [];
    // <-----

    // -->form对接数据
    public default_value;
    public onChange: any;
    // <-----

    constructor() {
    }

    ngOnInit() {
        if (isNullOrUndefined(this.options)) {
            this.view_options = Object.assign(this.options_default, {});
        } else {
            if (this.options.start_time === 1) {
                this.options.start_time = dateToStr(new Date());
            }
            this.view_options = Object.assign(this.options_default, this.options);
        }
        // 起始日期对选中日期的影响
        this.view_mode = this.view_options.min_view_mode;
        if (this.view_mode === 2) {
            if (this.view_options.start_time !== '') {
                if (this.view_options.start_time_type == 0) {
                    if (strToDate(this.view_options.start_time).getTime() >= strToDate(this.default_value).getTime()) {
                        const tmp_date = new Date(strToDate(this.view_options.start_time).getTime() + 86400000);
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                } else {
                    if (strToDate(this.view_options.start_time).getTime() > strToDate(this.default_value).getTime()) {
                        const tmp_date = new Date(strToDate(this.view_options.start_time).getTime());
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                }
            }
        } else if (this.view_mode === 1) {
            if (this.view_options.start_time !== '') {
                if (this.view_options.start_time_type == 0) {
                    // if (this.view_options)
                    if (strToDate(this.view_options.start_time).getTime() >= strToDate(this.default_value).getTime()) {
                        const tmp_test = strToDate(this.view_options.start_time);
                        const tmp_date = new Date(tmp_test.getFullYear(), tmp_test.getMonth() + 1, 1);
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                } else {
                    if (strToDate(this.view_options.start_time).getTime() > strToDate(this.default_value).getTime()) {
                        const tmp_test = strToDate(this.view_options.start_time);
                        const tmp_date = new Date(tmp_test.getFullYear(), tmp_test.getMonth(), 1);
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                }
            }
        }
        if (this.view_mode === 2) {
            this.view_data = this.initDate(this.view_mode, strToDate(this.default_value));
        } else if (this.view_mode === 1) {
            this.view_month = this.initDate(this.view_mode, strToDate(this.default_value));
        }
    }

    ngOnChanges() {
        if (isNullOrUndefined(this.options)) {
            this.view_options = Object.assign(this.options_default, {});
        } else {
            if (this.options.start_time === 1) {
                this.options.start_time = dateToStr(new Date());
            }
            this.view_options = Object.assign(this.options_default, this.options);
        }
        // 起始日期对选中日期的影响
        this.view_mode = this.view_options.min_view_mode;
        if (this.view_mode === 2) {
            if (this.view_options.start_time !== '') {
                if (this.view_options.start_time_type == 0) {
                    if (strToDate(this.view_options.start_time).getTime() >= strToDate(this.default_value).getTime()) {
                        const tmp_date = new Date(strToDate(this.view_options.start_time).getTime() + 86400000);
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                } else {
                    if (strToDate(this.view_options.start_time).getTime() > strToDate(this.default_value).getTime()) {
                        const tmp_date = new Date(strToDate(this.view_options.start_time).getTime());
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                }
            }
        } else if (this.view_mode === 1) {
            if (this.view_options.start_time !== '') {
                if (this.view_options.start_time_type == 0) {
                    // if (this.view_options)
                    if (strToDate(this.view_options.start_time).getTime() >= strToDate(this.default_value).getTime()) {
                        const tmp_test = strToDate(this.view_options.start_time);
                        const tmp_date = new Date(tmp_test.getFullYear(), tmp_test.getMonth() + 1, 1);
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                } else {
                    if (strToDate(this.view_options.start_time).getTime() > strToDate(this.default_value).getTime()) {
                        const tmp_test = strToDate(this.view_options.start_time);
                        const tmp_date = new Date(tmp_test.getFullYear(), tmp_test.getMonth(), 1);
                        [this._y_selected, this._m_selected, this._d_selected] = dateToArr(tmp_date);
                        this.emitValue();
                    }
                }
            }
        }
        if (this.view_mode === 2) {
            this.view_data = this.initDate(this.view_mode, strToDate(this.default_value));

        } else if (this.view_mode === 1) {
            this.view_month = this.initDate(this.view_mode, strToDate(this.default_value));
        }
    }

    // -->datepicker区域
    // 日期赋值
    initDate(type, date?) {

        // -->生成日级的渲染数据
        if (type === 2) {
            [this._year, this._month, this._day] = dateToArr(date);
            this._decade = Math.floor(this._year / 10);
            [this._y_selected, this._m_selected, this._d_selected] = dateToArr(date);
            this._date_selected = arrToDate([this._y_selected, this._m_selected, this._d_selected]);
            this._decade_selected = Math.floor(this._y_selected / 10);
            // 切割数组，变为行列分布的形式
            return this.renderDay();
        } else if (type === 1) {
            [this._year, this._month] = dateToArr(date);
            this._decade = Math.floor(this._year / 10);
            [this._y_selected, this._m_selected, this._d_selected] = dateToArr(date);
            this._date_selected = arrToDate([this._y_selected, this._m_selected, this._d_selected]);
            return this.renderMonth();
        }
        // <-----

    }

    // -->渲染日级视图数据
    renderDay() {

        const calendar_arr = [];
        const _first_day = new Date(this._year, this._month, 1);
        const _first_day_arr = dateToArr(_first_day);
        const date_offset = _first_day.getDay() === 0 ? 7 : _first_day.getDay();
        for (let i = 0; i < 42; i++) {
            const day_obj: MayihrDate = {};
            // -->显示日期，value赋值
            const _tmp_time_arr = dateToArr(new Date(this._year, this._month, i + 1 - date_offset));
            day_obj.text = `${_tmp_time_arr[2]}`;
            day_obj.value = `${_tmp_time_arr[0]}-${isMore(_tmp_time_arr[1] + 1)}-${isMore(_tmp_time_arr[2])}`;
            day_obj.operable = 1;
            // <-----
            // -->状态判断
            // // 当前天
            if (_tmp_time_arr.toString() === [this._y_selected, this._m_selected, this._d_selected].toString()) {
                day_obj.current_day = 1;
            }
            // 起止日判断
            if (this.view_options.start_time !== '') {

                let tmp;
                if (this.view_options.start_time_type == 0) {
                    tmp = (strToDate(this.view_options.start_time).getTime() >= arrToDate(_tmp_time_arr).getTime());
                } else {
                    tmp = (strToDate(this.view_options.start_time).getTime() > arrToDate(_tmp_time_arr).getTime());

                }
                if (tmp) {
                    // 
                    day_obj.operable = 0;
                }
            }
            if (this.view_options.end_time !== '') {
                let tmp;
                if (this.view_options.start_time_type == 0) {
                    tmp = (strToDate(this.view_options.start_time).getTime() <= arrToDate(_tmp_time_arr).getTime());
                } else {
                    tmp = (strToDate(this.view_options.start_time).getTime() < arrToDate(_tmp_time_arr).getTime());

                }
                if (tmp) {
                    day_obj.operable = 0;
                }
            }
            // 月份状态
            if (arrToDate(_first_day_arr, 'month').getTime() > arrToDate(_tmp_time_arr, 'month').getTime()) {
                day_obj.month_type = 0;
            } else if (arrToDate(_first_day_arr, 'month').getTime() < arrToDate(_tmp_time_arr, 'month').getTime()) {
                day_obj.month_type = 2;
            } else {
                day_obj.month_type = 1;
            }
            // <-----
            calendar_arr.push(JSON.parse(JSON.stringify(day_obj)));
        }
        return arrSplit(calendar_arr, 7);
    }

    // <-----
    // -->渲染月份
    renderMonth() {
        let tmp_arr = [];
        for (let i = 0; i < 12; i++) {
            const _tmp_time_arr = dateToArr(new Date(this._year, Number(i), 1));
            const tmp_obj = {};
            tmp_obj['value'] = i + 1;
            tmp_obj['selected'] = 0;
            if (_tmp_time_arr.toString() === [this._y_selected, this._m_selected, this._d_selected].toString()) {
                tmp_obj['selected'] = 1;
            }

            // 起止日判断
            tmp_obj['operable'] = 1;
            if (this.view_options.min_view_mode === 1) {
                if (this.view_options.start_time !== '') {
                    let tmp;

                    if (this.view_options.start_time_type == 0) {
                        tmp = (strToDate(this.view_options.start_time).getTime() >= arrToDate(_tmp_time_arr, 'month').getTime());
                    } else {
                        tmp = (strToDate(this.view_options.start_time).getTime() > arrToDate(_tmp_time_arr, 'month').getTime());

                    }
                    if (tmp) {
                        tmp_obj['operable'] = 0;
                    }
                }
                if (this.view_options.end_time !== '') {
                    let tmp;
                    if (this.view_options.start_time_type == 0) {
                        tmp = (strToDate(this.view_options.start_time).getTime() <= arrToDate(_tmp_time_arr, 'month').getTime());
                    } else {
                        tmp = (strToDate(this.view_options.start_time).getTime() < arrToDate(_tmp_time_arr, 'month').getTime());

                    }
                    if (tmp) {
                        tmp_obj['operable'] = 0;
                    }
                }
            }
            tmp_arr.push(tmp_obj);
        }

        return arrSplit(tmp_arr, 4);
    }

    // <-----
    // -->渲染年
    renderYear() {
        const tmp_arr = [];
        for (let i = 0; i < 12; i++) {
            tmp_arr.push(this._decade * 10 - 1 + i);
        }
        return arrSplit(tmp_arr, 4);
    }

    // <-----
    clickToggleDatePicker(event) {
        event.preventDefault();
        this.toggleDatepicker();
    }

    // -->打开/关闭日历选择区
    toggleDatepicker() {
        if (!this.disabled) {
            this.show_datepicker = !this.show_datepicker;
            if (this.show_datepicker) {
                this.view_data = this.initDate(this.view_options.min_view_mode, this._date_selected);
            }
        }
    }

    // <-----
    // -->选择日期
    // 直接点击列表中的div
    selectDay(event, data) {

        event.stopPropagation();
        if (data.operable) {
            // 当前月直接关闭，其他月先跳至其他月再选中
            const date_selected = strToDate(data.value);
            this.view_data = this.initDate(this.view_mode, date_selected);
            if (data.month_type === 1) {
                this.toggleDatepicker();
            }
            this.emitValue();
        }

    }

    selectMonth(event, data) {
        if (data.operable) {
            event.stopPropagation();
            if (this.view_options.min_view_mode === 2) {
                this.view_mode = 2;
                this.chooseMonthData(1, data.value);
            } else {
                this._y_selected = this._year;
                this._m_selected = data.value - 1;
                this._d_selected = 1;
                this._date_selected = arrToDate([this._y_selected, this._m_selected, this._d_selected]);
                this.toggleDatepicker();
                this.view_month = this.initDate(this.view_mode, this._date_selected);
            }
            this.emitValue();
        }
    }

    selectYear(event, data) {
        event.stopPropagation();
        this._year = data;
        if (this.view_options.min_view_mode >= 1) {
            this.view_mode = 1;
            this.chooseYearData(1, data);
        } else if (this.view_options.min_view_mode === 0) {
            this._y_selected = data;
            this._date_selected.setFullYear(this._y_selected);
            this.toggleDatepicker();
        }
        this.emitValue();
    }

    // -->改变显示方式
    changeViewMode() {
        if (this.view_mode !== 0) {
            if (isNullOrUndefined(this.view_month)) {
                this.view_month = this.renderMonth();
            }
            this.view_mode--;
        }
        if (this.view_mode === 0) {
            this.view_year = this.renderYear();
        }
    }

    // <-----
    // -->范围选择
    chooseData(type, num) {
        if (this.view_mode === 2) {
            this.chooseMonthData(type, num);
        } else if (this.view_mode === 1) {
            this.chooseYearData(type, num);
        } else if (this.view_mode === 0) {
            this.chooseDecadeData(type, num);
        }
    }

    // -->跳转月份--不赋值 -----type是变换类型，0是相对数量， 1是绝对数量
    chooseMonthData(type, num) {
        if (type) {
            this._month = num - 1;
            this.view_data = this.renderDay();
        } else {
            this._month += num;
            [this._year, this._month] = monthChangeYear(this._year, this._month);
            this.view_data = this.renderDay();
        }
    }

    chooseYearData(type, num) {
        type ? this._year = num : this._year += num;
        this._decade = Math.floor(this._year / 10);
        this.view_month = this.renderMonth();
    }

    chooseDecadeData(type, num) {
        type ? this._decade = num : this._decade += num;
        this.view_year = this.renderYear();
    }

    // <-----

    // <-----
    // <-----

    // -->form directive func 区域

    writeValue(value: any) {
        let tmp_init = value;
        if (!isUndefined(this.options) && !isUndefined(this.options.start_time)) {
            if (this.options.start_time_type == 0) {
                if (strToDate(value).getTime() < strToDate(this.options.start_time).getTime() + 86400000) {
                    this.propagateChange(this.options.start_time);
                    tmp_init = this.options.start_time;
                }
            } else if (this.options.start_time_type == 1) {
                if (strToDate(value).getTime() < strToDate(this.options.start_time).getTime()) {
                    this.propagateChange(this.options.start_time);
                    tmp_init = this.options.start_time;
                    // return false;
                }
            }
        }
        this.default_value = tmp_init;
        this.view_data = this.initDate(this.view_options.min_view_mode, strToDate(this.default_value));
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {

    }

    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }

    propagateChange = (_: any) => {
    };
    // <-----

    // 页面显示数据格式及内容确定
    emitValue() {
        if (this.view_options.min_view_mode === this.view_mode) {
            let virtual_date = new Date();
            if (this.view_options.min_view_mode >= 0) {
                this.default_value = `${this._y_selected}`;
                virtual_date = new Date(this._y_selected, 0, 1);
            }
            if (this.view_options.min_view_mode >= 1) {
                this.default_value += `-${isMore(this._m_selected + 1)}`;
                virtual_date.setMonth(this._m_selected);
            }
            if (this.view_options.min_view_mode >= 2) {
                this.default_value += `-${isMore(this._d_selected)}`;
                virtual_date.setDate(this._d_selected);
            }

            if ([this._y_selected, this._m_selected, this._d_selected].toString()
                !== [this._y_selected_pre, this._m_selected_pre, this._d_selected_pre].toString()) {
                if (this.view_options.output_type === 1) {
                    this.propagateChange(this.default_value);
                    this.changeValue.emit(this.default_value);
                } else {
                    this.changeValue.emit(virtual_date);
                }
                [this._y_selected_pre, this._m_selected_pre, this._d_selected_pre] = [this._y_selected, this._m_selected, this._d_selected];
            }
            if (this.view_options.output_type === 1) {
                this.propagateChange(this.default_value);
                this.refreshValue.emit(`${this._y_selected}-${isMore(this._m_selected + 1)}-${isMore(this._d_selected)}`);

            } else {
                this.refreshValue.emit(virtual_date);
            }
        }
    }
}

