import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() fade: string = '';
  @Input() iin: string = '';
  @Input() modal_target: string;
  @Input() args: Array<any>;
  // @Input() beforesubmit = false;
  @Output() hide: EventEmitter<boolean> = new EventEmitter();
  @Output() confirm: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  hideModal(event) {
    this.hide.emit(event);
  }
  confirmModal (event) {
    this.confirm.emit(event);
  }
}
