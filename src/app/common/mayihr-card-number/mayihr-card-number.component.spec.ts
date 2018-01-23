import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrCardNumberComponent } from './mayihr-card-number.component';

describe('MayihrCardNumberComponent', () => {
  let component: MayihrCardNumberComponent;
  let fixture: ComponentFixture<MayihrCardNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrCardNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrCardNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
