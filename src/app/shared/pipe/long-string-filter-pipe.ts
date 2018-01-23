import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
    name: 'longStringFilter'
})
export class LongStringFilterPipe implements PipeTransform {
    transform(value: any, length: number, is_omit: boolean = true): any {
        // console.log(value);
        if (!!value) {
            if (typeof value === 'string') {
                if (is_omit) {
                    if (value.length > length) {
                        return `${value.substr(0, length)}...`;
                    } else {
                        return value;
                    }
                } else {
                    if (value.length > length) {
                        return `${value.substr(0, length)}`;
                    } else {
                        return value;
                    }
                }
            } else if (typeof value === 'number') {
                return String(value);
            }
        }
    }
}