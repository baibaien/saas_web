class People {
  constructor(name) { //构造函数
    this.name = name;
  }
  get name() {
    return this._name.toUpperCase();
  }
  set name(name) {
    this._name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
var p = new People("tom");
console.log(p.name);    //1
console.log(p._name);    //2
p.sayName();    //3
