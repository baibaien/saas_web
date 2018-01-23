import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-header-to-footer',
    templateUrl: './header-to-footer.component.html',
    styleUrls: ['./header-to-footer.component.css']
})
export class HeaderToFooterComponent implements OnInit {

    public is_show = false;

    constructor(public renderer: Renderer2) {
        // console.log(12312);
        // this.renderer.listen(document.getElementsByClassName('scroll-wrapper')[0], 'onresize', (event) => {
        //     console.log(event);
        // window.addEventListener('resize', () => {
        //     console.log(234234);
        // });
        // });
        setInterval(() => {
            if (document.getElementsByClassName('scroll-wrapper')[0].clientHeight <
                document.getElementsByClassName('scroll-wrapper')[0].scrollHeight) {
                this.is_show = true;
            } else {
                this.is_show = false;
            }
        }, 100);
    }

    ngOnInit() {
    }

    toHeader() {
        document.getElementsByClassName('scroll-wrapper')[0].scrollTop = 0;
    }

    toFooter() {
        console.log(document.body);
        document.getElementsByClassName('scroll-wrapper')[0].scrollTop = document.getElementsByClassName('scroll-wrapper')[0].scrollHeight;
    }
}
