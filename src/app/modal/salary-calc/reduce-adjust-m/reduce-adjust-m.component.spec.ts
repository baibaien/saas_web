import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceAdjustMComponent } from './reduce-adjust-m.component';

describe('ReduceAdjustMComponent', () => {
  let component: ReduceAdjustMComponent;
  let fixture: ComponentFixture<ReduceAdjustMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduceAdjustMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduceAdjustMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
