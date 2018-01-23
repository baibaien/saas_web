/**
 * Created by Bonan on 2017/11/30.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {error} from "util";
@Pipe({
    name: 'monthCalcPipe'
})
export class MonthCalcPipe implements PipeTransform {
    transform(value: string | number, adjust: number): any {
        if (!isNaN(Number(value))) {
            let tmp = Number(value);
            if (tmp + adjust > 12) {
                return tmp + adjust - 12;
            } else if (tmp + adjust < 1) {
                return tmp + adjust + 12;
            } else {
                return tmp;
            }
        } else {
            console.error('参数错误');
            throw error;
        }
    }
}