import {HostListener, Renderer} from "@angular/core";
import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[appScroll]'
})
// 传入指定的dom元素实现锚点功能
export class ScrollDirective {
    @Input('appScroll') appScroll: ElementRef;

    @HostListener('click') onClick() {
        this.scrollTo();
    }

    constructor() {
    }

    scrollTo() {
        this.scrollAnimation(1000);
    }

    scrollAnimation(time) {
        const ele = document.getElementsByClassName('scroll-wrapper')[0];
        const end = this.appScroll.nativeElement.offsetTop + 40;
        let step = (end - ele.scrollTop) / time;
        if (step > 0 && step < 20) {
            step = 20;
        } else if (step > -20 && step < 0) {
            step = -20;
        }
        console.log(step);
        if (step !== 0) {
            const interval = setInterval(() => {
                ele.scrollTop += step;
                if ((step > 0 && (ele.scrollTop + step) > end) || (step < 0 && (ele.scrollTop + step) < end)) {
                    ele.scrollTop = end;
                    clearInterval(interval);
                }
                if (Math.abs(ele.scrollTop + ele.clientHeight - ele.scrollHeight) < 5) {
                    clearInterval(interval);
                }
            }, 1);
        }
    }

}

