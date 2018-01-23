import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saas-authorize',
  templateUrl: './saas-authorize.component.html',
  styleUrls: ['./saas-authorize.component.css']
})
export class SaasAuthorizeComponent implements OnInit {
  private name: string;
  private authorize: boolean;
  constructor() {
    this.authorize = false;
  }

  ngOnInit() {
  }

}
