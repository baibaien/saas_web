import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrPagingV2Component } from './mayihr-paging-v2.component';

describe('MayihrPagingV2Component', () => {
  let component: MayihrPagingV2Component;
  let fixture: ComponentFixture<MayihrPagingV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrPagingV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrPagingV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
