import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrFilterComponent } from './mayihr-filter.component';

describe('MayihrFilterComponent', () => {
  let component: MayihrFilterComponent;
  let fixture: ComponentFixture<MayihrFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
