import {FormControl, ValidatorFn} from "@angular/forms";
import {error} from "util";
import {promise} from "selenium-webdriver";
import controlFlow = promise.controlFlow;
/**
 * Created by Bonan on 2017/11/29.
 */
export class NumValidators {
    // -->type为0是不包括，1是包括
    // <-----
    static halfMin(min: number, type = 0): ValidatorFn {
        return (control: FormControl) => {
            let half_min = true;
            if (!isNaN(control.value)) {
                if (control.value !== '') {
                    // 中英文字符，不限字数
                    if (type == 1) {
                        half_min = Number(control.value) >= min;
                    } else if (type == 0) {
                        half_min = Number(control.value) > min;
                    }
                    return half_min ? null : {half_min: {msg: '超出最小值'}};
                }
            } else {
                // return {half_min: {msg: '不是数字'}};
            }
        };
    }

    static isNum(control: FormControl): object {
        const value = control.value;
        if (value !== '') {
            return !isNaN(value) ? null : {
                is_num: {
                    msg: '不是数字'
                }
            };
        }
    }

    static decimalDigitsValid(control: FormControl): object {
        let is_valid = true;
        if (control.value !== '') {
            is_valid = /^[0-9]+(.[0-9]{1})?$/.test(control.value);
            return is_valid ? null : {decimal_digits_valid: {msg: '小数位数不对'}};
        }
    }
}