import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'mayihr-card-number',
    templateUrl: './mayihr-card-number.component.html',
    styleUrls: ['./mayihr-card-number.component.css']
})
export class MayihrCardNumberComponent implements OnInit {
    @Input()
    show_number: number | string | number[];
    public number_list = [];
    constructor() {
    }

    ngOnInit() {
        if (typeof this.show_number === 'number' || 'string') {
            this.show_number = String(this.show_number);
            for (let i in this.show_number as any) {
                this.number_list.push(this.show_number[i]);
            }
        }
    }

}
