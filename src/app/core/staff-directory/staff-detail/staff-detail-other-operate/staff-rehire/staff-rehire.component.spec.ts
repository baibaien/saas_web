import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRehireComponent } from './staff-rehire.component';

describe('StaffRehireComponent', () => {
  let component: StaffRehireComponent;
  let fixture: ComponentFixture<StaffRehireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRehireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRehireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
