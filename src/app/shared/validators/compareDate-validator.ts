import {FormGroup} from "@angular/forms";

export function compareDate(group: FormGroup): Object {
    let month_error;
    if (group.value['op_month'] !== '' && group.value['ed_month'] !== '') {
        let tmp_op = group.value['op_month'][0]['id'].split('-');
        let tmp_ed = group.value['ed_month'][0]['id'].split('-');
        for (let i = 0; i < 2; i++) {
            if (tmp_ed[i] < tmp_op[i]) {
                month_error = false;
                break;
            }
            month_error = true;

        }
        return month_error ? null : {month_error: {msg: '终止月不可小于起始月'}};
    }
}