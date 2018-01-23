import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceDetailComponent } from './my-service-detail.component';

describe('MyServiceDetailComponent', () => {
  let component: MyServiceDetailComponent;
  let fixture: ComponentFixture<MyServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
