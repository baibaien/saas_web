import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-invoice-manage-modal',
  templateUrl: './invoice-manage-modal.component.html',
  styleUrls: ['./invoice-manage-modal.component.css']
})
export class InvoiceManageModalComponent implements OnInit {
  @Input()
  modal_name;
  @Input()
  modal_info;
  @Input()
  modal_callback;
  constructor() { }

  ngOnInit() {
  }

}
