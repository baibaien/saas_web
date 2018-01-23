import {FormControl, FormGroup} from "@angular/forms";
export function mixHour(formControl: FormControl): Object {
    let valid = true;
    if (formControl.value != 0) {
        valid = (formControl.value * 10000) % 625 === 0;
    }
    return valid ? null : {mixhour_valid: true};


}