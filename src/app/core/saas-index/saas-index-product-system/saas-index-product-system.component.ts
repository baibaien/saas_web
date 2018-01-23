import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saas-index-product-system',
  templateUrl: './saas-index-product-system.component.html',
  styleUrls: ['./saas-index-product-system.component.css', '../index-main.less']
})
export class SaasIndexProductSystemComponent implements OnInit {
  public type = 0;
  constructor() { }

  ngOnInit() {
  }


  toggleType(type) {
    this.type = type;
  }
}
