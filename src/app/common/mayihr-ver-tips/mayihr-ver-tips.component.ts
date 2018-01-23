import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "../../shared/service/modal/modal.service";
import {HttpService} from "../../shared/service/http-service/http.service";
import {UsersService} from "../../shared/service/api-service/users/users.service";

@Component({
    selector: 'mayihr-ver-tips',
    templateUrl: './mayihr-ver-tips.component.html',
    styleUrls: ['./mayihr-ver-tips.component.css']
})
export class MayihrVerTipsComponent implements OnInit {

    @Input()
    modal_callback;


    public choose_index = 1;
    public tmp_arr = [1, 2, 3, 4];

    constructor(public modalService: ModalService,
                public usersService: UsersService,
                public httpService: HttpService) {
    }

    ngOnInit() {
    }

    chooseTip(index) {
        this.choose_index = index;
        this.moveCarousel(index);
    }

    moveCarousel(i) {
        document.getElementById('carousel').style.left = `-${6.6 * (i - 1)}rem`;
    }

    closeTips() {
        this.httpService.myGet(this.usersService.getSetModalHide(), {search: {name: 'version_tips'}})
            .subscribe(data => {
                if (typeof this.modal_callback === 'function') {
                    this.modal_callback();
                }
                this.modalService.setModalName('');
                this.modalService.emitModalName();
            });
    }
}
