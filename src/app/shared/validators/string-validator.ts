import {FormControl} from "@angular/forms";
/**
 * Created by Bonan on 2017/12/22.
 */
export class StringValidators {
    static isEmpty(control: FormControl) {
        let is_empty = true;
        if (control.value.trim() === '') {
            is_empty = false;
        }
        return is_empty ? null : {is_empty: {msg: '不得为空'}};

    }
}