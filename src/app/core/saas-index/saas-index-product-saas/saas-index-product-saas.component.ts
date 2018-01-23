import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saas-index-product-saas',
  templateUrl: './saas-index-product-saas.component.html',
  styleUrls: ['./saas-index-product-saas.component.css', '../index-main.less']
})
export class SaasIndexProductSaasComponent implements OnInit {
  public type = 0;
  constructor() { }

  ngOnInit() {
  }


  toggleType(type) {
    this.type = type;
    console.log(this.type);
  }
}
