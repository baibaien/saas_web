import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrFilterStatusComponent } from './mayihr-filter-status.component';

describe('MayihrFilterStatusComponent', () => {
  let component: MayihrFilterStatusComponent;
  let fixture: ComponentFixture<MayihrFilterStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrFilterStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrFilterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
