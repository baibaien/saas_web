import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAddMComponent } from './department-add-m.component';

describe('DepartmentAddMComponent', () => {
  let component: DepartmentAddMComponent;
  let fixture: ComponentFixture<DepartmentAddMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAddMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAddMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
