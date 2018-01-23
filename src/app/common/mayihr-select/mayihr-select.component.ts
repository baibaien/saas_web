import {
    Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {isUndefined} from "util";


const MAYIHR_SELECT_ACCESS_VALUE: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MayihrSelectComponent),
    multi: true
};
@Component({
    selector: 'mayihr-select',
    templateUrl: './mayihr-select.component.html',
    styleUrls: ['./mayihr-select.component.css'],
    providers: [MAYIHR_SELECT_ACCESS_VALUE]
})
export class MayihrSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

    // -->select节点
    @ViewChild('select')
    select_node: ElementRef;
    @ViewChild('options')
    options_node: ElementRef;
    @ViewChild('option_box')
    options_box: ElementRef;
    // <-----
    // -->配置文件
    @Input()
    SelectConfig: MayihrSelectConfig;
    // <-----


    // -->源数据
    @Input()
    SelectData = [];
    public view_data_arr = [];
    // <-----
    // -->瀑布流补充数据
    @Input()
    AsyncData;
    // <-----

    // -->异步事件触发
    @Output()
    ActivedAsync = new EventEmitter();
    // <-----
    // -->选中option触发
    @Output()
    RefreshValue = new EventEmitter();
    // <-----

    // -->rxjs除颤
    public debounce_stream;
    // <-----
    // -->默认配置
    public SelectConfigDefault: MayihrSelectConfig = {
        icon: 'icon_triangle_down',
        allow_clear: false,
        title: '',
        href: '',
        href_text: '',
        async: false,
        placeholder: '请选择',
        max_length: 10,
        type: 1,
        single_default: 0
    };
    // <-----

    // -->下拉框状态
    public select_status: SelectStatus = {
        options_show: false,
        direction_up: false,
        can_show: false,
        disabled: false,
        async: false
    };
    // <-----

    public no_show = false;
    // -->操作方法对象
    public operator = new SelectOperator();
    // <-----
    public time_out;

    public _status_show = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!this.AsyncData && changes.hasOwnProperty('AsyncData')) {
            this.SelectData = this.SelectData.concat(changes.AsyncData.currentValue);
            this.view_data_arr = this.initOptions(this.SelectData, '');
        }
        if (!!this.SelectData && changes.hasOwnProperty('SelectData')) {
            this.SelectConfig = Object.assign(this.SelectConfigDefault, this.SelectConfig);
            this.view_data_arr = this.initOptions(this.SelectData, '');
        }
        // if (this.view_data_arr.length == 1 && (this.SelectConfig['single_default'] == 1)) {
        //     this.selectOption(this.view_data_arr[0], this.select_status);
        // }
        this.select_status.async = false;

    }

    // -->聚焦input
    focusInput() {
        this.view_data_arr = this.initOptions(this.SelectData, '');
        this.select_status.options_show = true;
        setTimeout(() => {
            if (document.documentElement.clientHeight - this.select_node.nativeElement.offsetTop < 400) {
                // this.select_status.direction_up = true;
            }
            if (document.documentElement.clientWidth - AssistFunction.offset(this.options_node).left < 450) {
                this.select_status.direction_left = true;
            }
            this.select_status.can_show = true;
            if (this.SelectConfig.type == 1) {
                document.getElementById('my_select_input').focus();
            }
            setTimeout(() => {
                if (!isUndefined(this.options_box)) {
                    this.options_box.nativeElement.scrollTop = 0;
                }
            });
        }, 1);
    }

    // <-----


    // -->input输入
    inputKeyUp(event) {
        let keyCode;
        if (event.keyCode) {
            keyCode = event.keyCode;
        } else {
            keyCode = event.which;
        }
        if (keyCode == 38) {
            this.operator.pre(this.view_data_arr);
        } else if (keyCode == 40) {
            this.operator.next(this.view_data_arr);
        } else if (keyCode == 13) {
            this.selectOption(this.view_data_arr, this.select_status);
        } else if (keyCode == 8) {
            this.view_data_arr = this.initOptions(this.SelectData, this.select_status.input);
        } else {
            this.view_data_arr = this.initOptions(this.SelectData, this.select_status.input);
        }
    }

    inputKeyUpAsync(event) {
        this.debounce(() => {
            this.ActivedAsync.emit({
                search: this.select_status.input || '',
                waterfall: false
            });
        }, 600);
    }

    // <-----

    // -->options初始化
    initOptions(data: MayihrOption[], search = '') {
        const tmp_arr = this.stringMatch(data, search);
        this.operator.setHighLight(0, tmp_arr);
        return tmp_arr;
    }

    // <-----

    // -->模糊匹配
    stringMatch(target: MayihrOption[], source: string = '') {
        const tmp_arr: MayihrOption[] = [];
        if (target.length > 0) {
            target.map((value) => {
                if (String(value.name).toLowerCase().indexOf(source.toLowerCase()) !== -1 && value['_status_'] !== 0) {
                    tmp_arr.push(value);
                }
            });
        }
        return tmp_arr;
    }

    // <-----
    selectOption(data, status: SelectStatus) {
        this.RefreshValue.emit({
            id: data.id,
            name: data.name
        });
        status.options_show = false;
        status.text = this.operator.filterLongString(data.name, this.SelectConfig).text;
        status.title = this.operator.filterLongString(data.name, this.SelectConfig).title;
        this.propagateChange([data]);
        this.propagateTouch(true);
        this.closeSelect(status);
        // this.no_show = !this.view_data_arr.some((value) => {
        //     return value._status_ == 1;
        // });
    }

    closeSelect(status) {
        status.options_show = false;
        status.can_show = false;
        status.async = false;
    }

    // -->表单函数


    asyncCheck(event) {
        const tmp = event.srcElement;
        if (this.SelectConfig.async) {
            if (tmp.clientHeight + tmp.scrollTop + 1 > tmp.scrollHeight) {
                if (!this.select_status.async) {
                    this.select_status.async = true;
                    this.ActivedAsync.emit({
                        search: this.select_status.input || '',
                        waterfall: true
                    });
                }
            }
        }
    }


    // -->
    // toSomePage() {
    // }

    // <-----

    // -->
    clearChoose() {
        [this.select_status.input, this.select_status.text, this.select_status.title] = ['', '', ''];
        this.propagateChange('');
        this.closeSelect(this.select_status);
    }


    /**
     * SelectCallBack
     * 函数描述
     * 额外操作回调函数
     * @params:
     * @return:
     */
    SelectCallBack(status, func) {
        this.closeSelect(status);
        setTimeout(() => {
            func();
        });
    }

    // <-----
    // -->form directive func 区域

    writeValue(value: MayihrOption[]) {
        if (value) {
            const tmp_data = this.operator.filterLongString(value[0].name, this.SelectConfig);
            this.select_status.text = tmp_data.text;
            this.select_status.title = tmp_data.title;
            // this.RefreshValue.emit(value[0]);
        } else {
            this.closeSelect(this.select_status);
            [this.select_status.input, this.select_status.text, this.select_status.title] = ['', '', ''];
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.propagateTouch = fn;
    }

    setDisabledState(isDisabled) {
        this.select_status.disabled = isDisabled;
    }

    propagateTouch = (_: any) => {
    };
    propagateChange = (_: any) => {
    };
    // <-----

    debounce(fn, delay) {
        if (isUndefined(this.time_out)) {
            this.time_out = setTimeout(() => {
                fn();
            }, delay);
        } else {
            clearTimeout(this.time_out);
            this.time_out = setTimeout(() => {
                fn();
            }, delay);
        }
    }
}


class MayihrOption {
    public id;
    public name;
    public focus;
    public remark;

    constructor(optionsObj: MayihrOptionItem) {
        [this.id, this.name, this.focus = false, this.remark = ''] =
            [optionsObj.id, optionsObj.name, optionsObj.focus, optionsObj.remark];
    }
}
class SelectOperator implements SelectOperatorInterface {
    public pre_high_light;

    constructor() {
        this.pre_high_light = -1;
    }

    pre(data: MayihrOption[]) {
        this.scrollControl('pre');
        if (this.pre_high_light != 0) {
            data[this.pre_high_light].focus = false;
            this.pre_high_light--;
            data[this.pre_high_light].focus = true;
        }
    }

    next(data) {
        this.scrollControl('next');
        if (data.length && this.pre_high_light != data.length - 1) {
            data[this.pre_high_light].focus = false;
            this.pre_high_light++;
            data[this.pre_high_light].focus = true;
        }
    }


    enterOption(i, data) {
        this.setHighLight(i, data);
    }

    leaveOption(i, data) {
        this.setHighLight(i, data);
    }


    setHighLight(index, data: MayihrOption[]) {
        if (data.length > 0) {
            data.map((val, i) => {
                data[i].focus = false;
            });
            // if (index != this.pre_high_light) {
            //     if (!!data[this.pre_high_light] && this.pre_high_light != -1) {
            //         data[this.pre_high_light].focus = false;
            //         data[index].focus = true;
            //         this.pre_high_light = index;
            //     } else {
            //         data[0].focus = true;
            //         this.pre_high_light = 0;
            //     }
            // } else {
            //     data[index].focus = true;
            // }
            data[index].focus = true;
        }
    }


    // 辅助函数
    scrollControl(type) {
        if (type === 'pre') {
            document.getElementsByClassName('my-option-container')[0].scrollTop -= 30;
        } else {
            document.getElementsByClassName('my-option-container')[0].scrollTop += 30;
        }
    }

    filterLongString(str, config: MayihrSelectConfig) {
        if (str.toString().length > config.max_length) {
            return {
                text: `${str.toString().substr(0, config.max_length)}...`,
                title: str
            };
        } else {
            return {
                text: str,
                title: ''
            };
        }
    }

}


class AssistFunction {
    static offset(node: ElementRef | HTMLDivElement | Element) {
        if (!(node instanceof ElementRef) && (node as HTMLDivElement).className === 'my-select') {
            const _node = (node as HTMLDivElement).offsetParent as HTMLDivElement;
            const tmp = {
                top: _node.offsetTop,
                left: _node.offsetLeft,
                width: _node.offsetWidth,
                height: _node.offsetHeight
            };
            return tmp;
        } else {
            if (node instanceof ElementRef) {
                if (node.nativeElement['parentElement']) {
                    const tmp = node.nativeElement['parentElement'];
                    return this.offset(tmp as HTMLDivElement);
                }
            } else if (node instanceof HTMLDivElement) {
                const _node = node as HTMLDivElement;
                if (_node['parentElement']) {
                    const tmp = (_node as HTMLDivElement).parentElement;
                    return this.offset(tmp as HTMLDivElement);
                }
            }
        }
    }
}

interface SelectStatus {
    options_show?: boolean;
    input?: string;
    text?: string;
    title?: string;
    direction_left?: boolean;
    direction_up?: boolean;
    can_show?: boolean;
    disabled?: boolean;
    async?: boolean;
}
interface MayihrOptionItem {
    id: string | number;
    name: string | number;
    focus?: boolean;
    remark?: string | number;
}

interface MayihrSelectConfig {
    icon?: string | number;
    allow_clear?: boolean;
    title?: string | number;
    href?: string;
    href_text?: string;
    placeholder?: string;
    async?: boolean;
    max_length?: number;
    type?: number;
    single_default?: number;
}


interface SelectOperatorInterface {
    pre: object;
    next: object;
    enterOption: object;
    leaveOption: object;
    setHighLight: object;
}
