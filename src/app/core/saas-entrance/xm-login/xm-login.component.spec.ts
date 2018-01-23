import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmLoginComponent } from './xm-login.component';

describe('XmLoginComponent', () => {
  let component: XmLoginComponent;
  let fixture: ComponentFixture<XmLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
