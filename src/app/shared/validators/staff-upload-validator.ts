import {Form, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {error, isNullOrUndefined} from "util";
import {controlPath} from "@angular/forms/src/directives/shared";
import {main} from "@angular/compiler-cli/src/main";

export function socialValid(group: FormGroup): Object {
    let social_valid = true;
    let fund_valid = true;
    let social_base_valid = true;
    if (group.get('yg_is_social').value) {
        social_valid = group.get('yg_social_self').value !== ''
            && group.get('social_start').value != 0
            && group.get('social_rule').value != 0; // 规则有问题
    }
    if (group.get('yg_is_fund').value) {
        fund_valid = group.get('yg_fund_self').value !== ''
            && group.get('fund_start').value != 0
            && group.get('fund_rule').value != 0; // 规则有问题
    }
    if (group.get('yg_is_social').value || group.get('yg_is_social').value) {
        social_base_valid = group.get('yg_city').value != 0
            && group.get('yg_hk_type').value != 0
            && group.get('yg_pay_type').value != 0;
    }
    return social_valid && fund_valid && social_base_valid ? null : {id_valid: true};
}
export function socialBase(social_low, social_high): ValidatorFn {
    let valid = true;
    social_low = Number(social_low);
    social_high = Number(social_high);
    return (control: FormControl) => {
        // console.log(control.value);
        // console.log(isNaN(control.value));
        if (control.value !== '' && !isNaN(control.value)) {
            const value = Number(control.value);
            if (value > social_high || value < social_low) {
                valid = false;
            } else {
                valid = true;
            }
        }
        return valid ? null : {social_error: {msg: `社保基数应在${social_low.toFixed(2)}~${social_high.toFixed(2)}之间`}};
    };

}

export function fundBase(fund_low, fund_high): ValidatorFn {
    let valid = true;
    fund_high = Number(fund_high);
    fund_low = Number(fund_low);
    return (control: FormControl) => {
        if (control.value !== '') {
            const value = Number(control.value);
            if (value > fund_high || value < fund_low) {
                valid = false;
            } else {
                valid = true;
            }
        }
        return valid ? null : {fund_error: {msg: `公积金基数应在${fund_low.toFixed(2)}~${fund_high.toFixed(2)}之间`}};
    };
}

export function idValid(group: FormGroup): Object {
    console.log(group.get('id_type'));
    let id_valid = true;
    if (!isNullOrUndefined(group.get('id_type').value) && group.get('id_type').value !== '') {
        if (group.get('id_type').value[0].id == '1' && group.get('yg_identity').value != '') {
            // 身份证验证/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            // language=JSRegexp
            // console.log('test');
            id_valid = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(group.get('yg_identity').value);
        }
    }
    return id_valid ? null : {id_valid: {msg: '证件号码有误'}};
}
export function contactValid(group: FormGroup): Object {
    let contact_valid = true;
    if (group.get('yg_login').value) {
        // if (group.get('contact_way').value === '1' && group.get('yg_phone').value !== '') {
        contact_valid = /^1[345789]\d{9}$/.test(group.get('yg_phone').value);
        // // console.log(contact_valid + 'true');
        return contact_valid ? null : {
            contact_valid: {
                msg: '手机号码格式不正确'
            }
        };
        // } else if (group.get('contact_way').value === '2' && group.get('yg_phone').value !== '') {
        //     contact_valid = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(group.get('yg_phone').value);
        //     // console.log(contact_valid + 'false');
        // return contact_valid ? null : {contact_valid: {msg: '邮箱格式不正确'}};
        // }
    }
}
export function phoneValid(control: FormControl): Object {
    // console.log(control.value);
    let phone_valid = true;
    if (control.value != '' && !isNullOrUndefined(control.value)) {
        phone_valid = /^1[345789]\d{9}$/.test(control.value);
    }
    // console.log(phone_valid);
    return phone_valid ? null : {phone_valid: {msg: '手机格式不正确'}};
}
export function mailValid(control: FormControl): Object {
    let mail_valid = true;
    if (control.value !== '') {
        mail_valid = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/.test(control.value);
    }
    return mail_valid ? null : {mail_valid: {msg: '请输入有效邮箱'}};
}
export function staticPhoneValid(control: FormControl): Object {
    let phone_valid = true;
    if (control.value) {
        if (control.value !== '') {
            // phone_valid = /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/.test(control.value);
            phone_valid = /^\d{3,4}\-\d{7,8}$/.test(control.value);
        }
    }
    return phone_valid ? null : {phone_valid: {msg: '请输入有效固定电话'}};
}
export function requireStr(control: FormControl): Object {
    let require = true;
    if (control.value === '' || !control.value) {
        require = false;
    }
    return require ? null : {require_valid: {msg: '该项不能为空'}};
}
export function requireNum(control: FormControl): Object {
    // 正整数
    let require_num = true;
    if (control.value !== '') {
        require_num = !isNaN(control.value);
    }
    return require_num ? null : {require_num: {msg: '请填写数字'}};
}
export function requireDeciPos(control: FormControl): Object {
    //两位正小数
    let require_num = true;
    if (control.value !== '') {
        require_num = /^[0-9]+(.[0-9]{2})?$/.test(control.value);
    }
    return require_num ? null : {require_Deci: {msg: '最多保留两位，且需要为正数'}};
}
export function requireDeci(control: FormControl): Object {
    //两位小数
    let require_num = true;
    if (control.value !== '') {
        require_num = /^[0-9]+(.[0-9]{1,2})?$/.test(control.value) && (Number(control.value) > 0 ? control.value.substr(0, 1) != 0 : true);
    }
    return require_num ? null : {require_Deci: {msg: '请填写合法数字'}};
}
export function NumLength(minLength, maxLength): ValidatorFn {
    let valid = true;
    return (control: FormControl) => {
        console.log(control.value === '');
        if (control.value !== '') {
            valid = /^[0-9]*$/.test(control.value) && control.value.length >= minLength && control.value.length <= maxLength;
        } else {
            valid = true;
        }
        return valid ? null : {require_length: {msg: `应在${minLength}~${maxLength}之间`}};
    };
}
export function fileExtension(config: any): ValidatorFn {
    return (control: FormControl) => {
        const urlRegEx: RegExp = /\.(jpe?g|png|gif)$/i;

        if (control.value && !control.value.match(urlRegEx)) {
            this.deleteImg = false;
            return {
                invalidUrl: config.msg
            };
        } else {
            return null;
        }
    };
}

export function minRequired(group: FormGroup): Object {
    let min_length = true;
    let length = 0;
    for (const obj in group.controls) {
        if (group.controls[obj].value) {
            length++;
        }
    }
    if (length <= 0) {
        min_length = false;
    }
    return min_length ? null : {min_length: {can_submit: true, length: length}};
}
export function PwValid(control: FormControl): Object {
    let pw_valid = true;
    if (control.value != '') {
        // 数字、字母、下划线
        pw_valid = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/.test(control.value);
    }
    return pw_valid ? null : {pw_valid: {msg: '密码只能6~20位由数字、字母、下划线组成'}};
}
export function nameValid(control: FormControl): Object {
    let name_valid = true;
    if (control.value != '') {
        // 中英文字符，不限字数
        name_valid = /^[\u4E00-\u9FA5A-Za-z]+$/.test(control.value);
    }
    return name_valid ? null : {name_valid: {msg: '联系人姓名只能为中英文字符'}};
}

export function taxValid(control: FormControl): Object {
    let tax_valid = true;
    if (control.value !== '') {
        tax_valid = /^[a-zA-Z0-9]{15,20}$/.test(control.value);
    }
    return tax_valid ? null : {tax_valid: {msg: '纳税人识别号不合法'}};
}
export function MainNumber(control: FormControl): Object {
    let main_valid = true;
    if (control.value !== '') {
        main_valid =  /^[a-zA-Z0-9\_\-]{1,20}$/.test(control.value);
        console.log(main_valid);
    }
    return main_valid ? null : {main_valid: {msg: '营业执照号格式有误'}};
}
export function trySallaryValid(): ValidatorFn {
    return (control: FormControl) => {
        let valid = true;
        if (control.value == '') {
            valid = false;
        }
        return valid ? null : {try_sallary_valid: {err: '试用期工资不能为空'}};
    };
}


/**
 * legalRange
 * 函数描述
 * 合法范围校验
 * @params:
 * @return:
 */
export function LegalRange(min, max): ValidatorFn {
    if (!isNaN(min) && !isNaN(max)) {
        return (control: FormControl) => {
            if (!isNaN(Number(control.value))) {
                if (control.value >= min && control.value <= max) {
                    return null;
                } else {
                    // console.log(1231233);
                    return {LegalRange: {msg: `数值范围必须在${min}~${max}之间`}};
                }
            } else {
                return {LegalRange: {msg: '内容为非法格式'}};
            }
        };
    } else {
        console.error('校验器参数错误');
        throw error;
    }

}


/**
 * passwordValid
 * 函数描述
 * 密码强度校验
 * @params:
 * @return:
 */
export function passwordValid(control: FormControl): object {
    if (control.value) {
        const test = /^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{8,16}$/;
        console.log(control.value);
        console.log(test.test(control.value));
        if (test.test(control.value)) {

        }
        return test.test(control.value) ? null : {passwordValid: {msg: '密码格式错误'}};
    }
}
