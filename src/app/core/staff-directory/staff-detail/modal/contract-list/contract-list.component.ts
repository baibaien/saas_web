import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaffDetailService} from "../../../../../shared/service/staff-directory/staff-detail/staff-detail.service";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  @Output() hide: EventEmitter<boolean> = new EventEmitter();
  @Input() modal_args: Array<any>; // yg_id
  public contract_list;
  public yg_id;

  constructor(public staffDetailService: StaffDetailService) {
  }

  ngOnInit() {
    this.yg_id = this.modal_args[0];
    console.log('yg_id', this.yg_id);
   this.staffDetailService.getContractList(this.yg_id).subscribe((res) => {
     this.contract_list = res.data.data;
     console.log(this.contract_list);
   });

  }

  cancelModal() {
    this.hide.emit(true);
  }
}
