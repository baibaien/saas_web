import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-leave-page',
  templateUrl: './leave-page.component.html',
  styleUrls: ['./leave-page.component.css']
})
export class LeavePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() hide: EventEmitter<boolean> = new EventEmitter();
  @Output() confirm: EventEmitter<Object> = new EventEmitter();


  cancelModal() {
    this.hide.emit(true);
  }
  leave() {
    this.confirm.emit({func_name: 'leavePage', args: ''});
  }
}
