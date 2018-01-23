import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
  selector: 'app-yg-self-login',
  templateUrl: './yg-self-login.component.html',
  styleUrls: ['./yg-self-login.component.css']
})
export class YgSelfLoginComponent implements OnInit {
  @Input()
  modal_name;

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

  cancelModal() {
              this.modalService.setModalName('');
              this.modalService.emitModalName();
          }
}
