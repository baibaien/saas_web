import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-index-calc',
    templateUrl: './index-calc.component.html',
    styleUrls: ['./index-calc.component.css'],
})
export class IndexCalcComponent implements OnInit, OnChanges {

    @Input()
    company_money = 100;
    @Input()
    costumer_money = 20;
    public is_click = false;

    public x_center;
    public btn_ele;
    public btn_track;
    public img_width = 50;
    public pre_move;


    public num_choose = 1;
    public result_money = 0;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.result_money = this.calcMoney(this.num_choose, this.company_money, this.costumer_money);
    }


    startMove(event) {
        event.stopPropagation();
        this.pre_move = event.screenX;
        this.is_click = true;

    }

    Moving(event, track, tooltip) {
        event.stopPropagation();
        this.btn_ele = event.target;
        this.btn_track = track;
        if (this.is_click) {
            const parent_width = this.btn_ele.parentElement.clientWidth;
            if (this.calcXCenter(this.btn_ele.offsetLeft, this.img_width) >= parent_width && event.movementX >= 0) {
                this.btn_ele.style.left = `${this.btn_ele.parentElement.clientWidth - this.img_width / 2}px`;
                return;
            } else if (this.calcXCenter(this.btn_ele.offsetLeft, this.img_width) <= 0 && event.movementX <= 0) {
                this.btn_ele.style.left = '-25px';
                return;
            } else {
                this.btn_ele.style.left = `${event.screenX - this.pre_move + this.btn_ele.offsetLeft}px`;
                // tooltip.style.left = `${event.screenX - this.pre_move + this.btn_ele.offsetLeft - 95}px`;
                this.pre_move = event.screenX;
                const tmp = this.calcResult(this.calcXCenter(this.btn_ele.offsetLeft, this.img_width), parent_width);
                this.btn_track.style.width = `${tmp}%`;
                this.num_choose = tmp;
                this.result_money = this.calcMoney(this.num_choose, this.company_money, this.costumer_money);

            }
        }
    }

    endMove(event) {
        event.stopPropagation();
        this.is_click = false;
    }


    clickAxis(event, btn, track, tooltip) {
        this.btn_ele = btn;
        this.btn_track = track;
        this.btn_ele.style.left = `${event.offsetX - this.img_width / 2}px`;
        // tooltip.style.left = `${event.offsetX - this.img_width / 2 - 95}px`;
        const tmp = this.calcResult(this.calcXCenter(this.btn_ele.offsetLeft, this.img_width), this.btn_ele.parentElement.clientWidth);
        this.btn_track.style.width = `${tmp}%`;
        this.num_choose = tmp;
        this.result_money = this.calcMoney(this.num_choose, this.company_money, this.costumer_money);

    }

    calcXCenter(left, width) {
        return left + width / 2;
    }

    calcResult(current, total) {
        const range = total / 100;
        const result = Math.floor(current / range) + 1;
        return result > 100 ? 100 : result < 1 ? 1 : result;
    }

    noResult(event) {
        event.stopPropagation();
    }

    calcMoney(num, con_money, cos_money) {
            return Number(num) * Number(cos_money) + Number(con_money);
    }
}
