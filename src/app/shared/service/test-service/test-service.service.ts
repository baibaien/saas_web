import { Injectable } from '@angular/core';

@Injectable()
export class TestServiceService {
  public test = 123;
  constructor() { }
  setTest(data) {
    console.log(1);
    this.test = data;
    console.log(this.test);
  }
  getTest() {
    return this.test;
  }
}
