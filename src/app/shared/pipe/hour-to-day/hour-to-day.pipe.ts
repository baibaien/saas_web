import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hourToDay'
})
export class HourToDayPipe implements PipeTransform {

    transform(value: any, type = 0): any {
        if (!isNaN(value)) {
            if (value >= 8) {
                return `${Math.floor(value / 8)}天${value % 8 == 0 ? '' : value % 8 + '小时'}`;
            } else if (value > 0) {
                return `${value}小时`;
            } else {
                return ['-', '0小时', '暂无'][type];
            }
        } else {
            return ['-', '0小时', '暂无'][type];
        }
    }
}
