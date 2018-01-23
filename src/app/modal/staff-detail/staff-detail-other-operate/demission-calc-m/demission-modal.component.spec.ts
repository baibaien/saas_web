import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemissionModalComponent } from './demission-modal.component';

describe('DemissionModalComponent', () => {
  let component: DemissionModalComponent;
  let fixture: ComponentFixture<DemissionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemissionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
