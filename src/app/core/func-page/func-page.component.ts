import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {LoginService} from "../../shared/service/login/login.service";
import {ModalService} from "../../shared/service/modal/modal.service";

@Component({
    selector: 'app-func-page',
    templateUrl: './func-page.component.html',
    styleUrls: ['./func-page.component.css']
})
export class FuncPageComponent implements OnInit, OnDestroy {
    public jump_show = true;
    public modal_name_emitter;
    public modal_name = '';

    constructor(public renderer: Renderer2,
                public loginService: LoginService,
                public modalService: ModalService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }
}
