import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEditMComponent } from './department-edit-m.component';

describe('DepartmentEditMComponent', () => {
  let component: DepartmentEditMComponent;
  let fixture: ComponentFixture<DepartmentEditMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentEditMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEditMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
