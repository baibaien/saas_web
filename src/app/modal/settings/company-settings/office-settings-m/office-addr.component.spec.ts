import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAddrComponent } from './office-addr.component';

describe('OfficeAddrComponent', () => {
  let component: OfficeAddrComponent;
  let fixture: ComponentFixture<OfficeAddrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAddrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAddrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
