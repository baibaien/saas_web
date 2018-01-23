import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-saas-index-aboutus',
  templateUrl: './saas-index-aboutus.component.html',
  styleUrls: ['./saas-index-aboutus.component.css', '../index-main.less']
})
export class SaasIndexAboutusComponent implements OnInit {
  public about_us_content = 0;
  public year = 2017;
  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(data => {
      this.about_us_content = Number(data.id);
    });
  }

  ngOnInit() {
  }

  toggleAboutUs(index) {
    this.about_us_content = index;
  }
  toggleYear(year) {
    this.year = year
  }
}
