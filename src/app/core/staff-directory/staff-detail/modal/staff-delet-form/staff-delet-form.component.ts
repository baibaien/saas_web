import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'app-staff-delet-form',
  templateUrl: './staff-delet-form.component.html',
  styleUrls: ['./staff-delet-form.component.css']
})
export class StaffDeletFormComponent implements OnInit {
  @Input() modal_args: Array<any>;
  @Output() hide: EventEmitter<boolean> = new EventEmitter();
  @Output() confirm: EventEmitter<Object> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    // console.log(this.modal_args , 'init');
  }
  cancelModal() {
    this.hide.emit(true);
  }
  deletMsg() {
    this.confirm.emit({func_name: 'deleteForm', args: this.modal_args});
    // console.log(.modal_args[0] + 'delet');
  }
}
