import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-notice',
  templateUrl: './modal-notice.component.html',
  styleUrls: ['./modal-notice.component.css']
})
export class ModalNoticeComponent implements OnInit {

  // public modal_name_emit = new EventEmitter();
  @Input() modal_name;
  @Input() modal_info;
  constructor() {
  }

  ngOnInit() {
  }

}
