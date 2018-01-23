import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {StaffDetailService} from "../../../../shared/service/staff-directory/staff-detail/staff-detail.service";
import {requireNum} from "../../../../shared/validators/staff-upload-validator";

@Component({
  selector: 'app-staff-hospital',
  templateUrl: './staff-hospital.component.html',
  styleUrls: ['./staff-hospital.component.css']
})
export class StaffHospitalComponent implements OnInit {

  @Output() hide: EventEmitter<boolean> = new EventEmitter();
  @Output() confirm: EventEmitter<Object> = new EventEmitter();
  @Input() modal_args: Array<any>;
  @ViewChild('scroller') scroller: ElementRef;
  public hospital_msg: FormGroup;
  public hospitals: FormGroup;
  // public be_qualified_submit = true;
  public yg_id;
  public hospital_area;
  public hospital_level;
  public hospital_list = [];
  public chosen_hospital_id: Array<any> = [];
  public chosen_hospital: Array<any> = [];
  public chosen_level: Array<any> = [];
  public chosen_area: Array<any> = [];
  public hospital_show = {};
  public page = 1;
  public no_more = false;
  public loading = 0;


  constructor(public fb: FormBuilder, public staffDetailService: StaffDetailService) {

    this.hospital_msg = this.fb.group({
      name: [''],
      // level: [0],
      level: [],
      area_id: []
    });
    this.hospitals = this.fb.group({
      hospital: fb.array([])
    });
    // this.searchHospital();
  }

  ngOnInit() {
    this.yg_id = this.modal_args[0];
    console.log('init');
    console.log(this.modal_args);
    this.chosen_hospital = JSON.parse(JSON.stringify(this.modal_args[1]));
    this.staffDetailService.getHospitalInfo({yg_id: this.yg_id}).subscribe((res) => {
      this.hospital_area = res.data.areas;
      this.hospital_level = res.data.levels;
    });
    for (let i = 0; i < this.chosen_hospital.length; i++) {
      this.chosen_hospital_id.push(this.chosen_hospital[i]['id']);
    }
  }


  scrollLoad(event) {
    // const height = document.getElementById('scroller').clientHeight;
    const scroll_height = event.srcElement.scrollHeight;
    const wrapper_height = event.srcElement.offsetHeight;
    const scrollTop = event.srcElement.scrollTop;
    if (scrollTop + wrapper_height >= scroll_height - 5) {
      this.loading++;
      this.searchHospital(false);
    }
  }

  cancelModal() {
    this.hospital_msg.reset('');
    this.hide.emit(true);
  }

  searchHospital(refresh = false) {
    if (this.loading <= 1) {
      this.page = refresh ? 1 : this.page;
      this.no_more = refresh ? false : this.no_more;
      if (!this.no_more) {
        let submit_data = {
          pagesize: 20,
          page: this.page
        };
        for (let obj in this.hospital_msg.controls) {
          if (obj === 'name') {
            submit_data[obj] = this.hospital_msg.controls[obj].value;
          } else {
            submit_data['area_id'] = this.chosen_area;
            submit_data['level'] = this.chosen_level;
          }
        }
        this.staffDetailService.getYgHospitalMsg(submit_data)
          .subscribe((res) => {
            let hospital_list = this.hospital_list;
            hospital_list = refresh ? res.data.data : hospital_list.concat(res.data.data);
            this.no_more = res.data.meta.pagination.current_page >= res.data.meta.pagination.total_pages;
            this.hospital_list = hospital_list;
            // this.hospital_msg.reset('');
            this.page++;
            if (refresh) {
              this.scroller.nativeElement.scrollTop = 0;
            }
            this.loading = 0;
          });
      }
    }

  }

  selectHospital(event, item) {
    if (this.chosen_hospital_id.indexOf(item.id) < 0 && this.chosen_hospital.length < 5) {
      this.chosen_hospital.push(item);
      console.log(item);
      this.chosen_hospital_id.push(item.id);

    } else if (this.chosen_hospital_id.indexOf(item.id) >= 0) {
      this.removeChosen(item);
    }
  }

  removeChosen(item) {
    let remove_index = this.chosen_hospital_id.indexOf(item.id);
    this.chosen_hospital.splice(remove_index, 1);
    this.chosen_hospital_id.splice(remove_index, 1);

  }

  addLevel(id, event) {
    if (event.target.checked) {
      this.chosen_level.push(id);
    } else {
      let remove_index = this.chosen_level.indexOf(id);
      this.chosen_level.splice(remove_index, 1);
    }
    this.loading = 0;
    this.searchHospital(true);
  }

  addArea(index, id, event) {
    if (event.target.checked) {
      this.chosen_area.push(id);
    } else {
      let remove_index = this.chosen_area.indexOf(id);
      this.chosen_area.splice(remove_index, 1);
    }
    this.loading = 0;
    this.searchHospital(true);
  }

  saveMsg() {
    let submit_data = {};
    submit_data['yg_id'] = this.yg_id;
      submit_data['ids'] = this.chosen_hospital_id;
      this.staffDetailService.updateYgHospitalMsg(submit_data)
        .subscribe((res) => {
          this.hide.emit(true);
          this.confirm.emit({func_name: 'showHospital', args: JSON.parse(JSON.stringify(this.chosen_hospital))});
        });
  }
}
