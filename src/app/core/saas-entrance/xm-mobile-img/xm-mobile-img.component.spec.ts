import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmMobileImgComponent } from './xm-mobile-img.component';

describe('XmMobileImgComponent', () => {
  let component: XmMobileImgComponent;
  let fixture: ComponentFixture<XmMobileImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmMobileImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmMobileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
