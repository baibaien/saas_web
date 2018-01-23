import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePageComponent } from './leave-page.component';

describe('LeavePageComponent', () => {
  let component: LeavePageComponent;
  let fixture: ComponentFixture<LeavePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
