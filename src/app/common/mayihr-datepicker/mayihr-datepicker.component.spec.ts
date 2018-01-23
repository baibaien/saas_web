import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrDatepickerComponent } from './mayihr-datepicker.component';

describe('MayihrDatepickerComponent', () => {
  let component: MayihrDatepickerComponent;
  let fixture: ComponentFixture<MayihrDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
