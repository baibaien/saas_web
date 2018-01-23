import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPersonnalChangeComponent } from './staff-personnal-change.component';

describe('StaffPersonnalChangeComponent', () => {
  let component: StaffPersonnalChangeComponent;
  let fixture: ComponentFixture<StaffPersonnalChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPersonnalChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPersonnalChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
