import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WxScanComponent } from './wx-scan.component';

describe('WxScanComponent', () => {
  let component: WxScanComponent;
  let fixture: ComponentFixture<WxScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WxScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WxScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
