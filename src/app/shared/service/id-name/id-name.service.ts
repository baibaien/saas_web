import { Injectable } from '@angular/core';

@Injectable()
export class IdNameService {
  public id;
  public name;
  constructor() { }
  setName(id, name) {
    this.id = id;
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
