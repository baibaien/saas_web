import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceItemMComponent } from './reduce-item-m.component';

describe('ReduceItemMComponent', () => {
  let component: ReduceItemMComponent;
  let fixture: ComponentFixture<ReduceItemMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduceItemMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduceItemMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
