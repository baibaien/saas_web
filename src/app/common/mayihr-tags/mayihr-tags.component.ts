import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {isUndefined} from "util";

@Component({
    selector: 'mayihr-tags',
    templateUrl: './mayihr-tags.component.html',
    styleUrls: ['./mayihr-tags.component.css']
})
export class MayihrTagsComponent implements OnChanges {
    // -->data_list是外部输入的未经格式化的数组
    //    实际使用的all_data数组
    // <-----
    @Input()
    data_list;
    @Input()
    show_all: boolean;
    @Input()
    only_one_show: false;
    @Input()
    callback: object;
    @Input()
    default_selected: number | string;
    @Input()
    length_control;
    @Output()
    data_choosed = new EventEmitter();
    // -->请求提交数据
    public submit_data;
    // <-----
    // -->换行逻辑数据
    public all_data = [];
    public row_now = 0;
    // <-----
    constructor() {
    }

    ngOnChanges() {
        console.log(this.data_list);

        this.all_data = [];
        // if (!isUndefined(this.data_list)  && (this.only_one_show || this.data_list.length > 1)) {
        if (!isUndefined(this.data_list)) {
            // -->将所有的字符串转换为对象
            for (const i in  this.data_list) {
                if (typeof this.data_list[i] === 'string') {
                    const tmp = this.data_list[i];
                    this.data_list[i] = {
                        id: tmp,
                        name: tmp
                    };
                }
            }
            console.log(this.data_list);
            // <-----

            // -->判断是否有默认选中，以及是否需要添加'全部'tag
            // 为保证输入数组的序号与实际数组序号一致，故先对修改前的数组进行默认选中操作，默认选中传入数组的第一个
            // 若没有默认，且有全部tag，则选中全部tag
            // 若没有默认，且没有全部tag，则选中传入数组的第一个
            if (!isUndefined(this.default_selected)) {
                for (const i in this.data_list) {
                    if (this.data_list[i].id == this.default_selected) {
                        this.data_list[i]['selected'] = 1;
                    }
                }
            }
            if (this.show_all === true && this.data_list.length > 1) {
                this.data_list.unshift({
                    id: 0,
                    name: '全部'
                });
            }
            if (isUndefined(this.default_selected)) {
                let all_status = true;
                for (let i in this.data_list) {
                    if (Number(i) > 0) {
                        if (this.data_list[i]['selected']) {
                            all_status = false;
                        }
                    }
                }
                if (all_status) {
                    this.data_list[0]['selected'] = 1;
                }
            }
            // <-----
            // -->对传入数组进行初始化，十个一组，放入all_data二维数组
            // all_data的第一个维度是数据行数
            let tmp_counter = -1;
            this.data_list.map((val, index) => {
                if (index % 10 === 0) {
                    this.all_data[tmp_counter + 1] = [];
                    tmp_counter++;
                }
                if (val.selected === 1) {
                    this.row_now = tmp_counter;
                }
                this.all_data[tmp_counter].push(val);
            });
        }
    }

    // <-----
    // -->切换行数
    toggleRow(type) {
        if (type === -1) {
            this.row_now--;
        } else {
            this.row_now++;
        }
    }

    // <-----
    chooseData(data) {
        for (const i in this.all_data) {
            for (const j in this.all_data[i]) {
                if (this.all_data[i][j]['selected'] === 1 && this.all_data[i][j]['id'] === data.id) {
                    return false;
                }
                this.all_data[i][j]['selected'] = 0;
            }
        }
        data['selected'] = 1;
        this.data_choosed.emit(data);
    }
}
