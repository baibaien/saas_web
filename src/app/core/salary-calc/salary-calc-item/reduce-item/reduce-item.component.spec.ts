import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduceItemComponent } from './reduce-item.component';

describe('ReduceItemComponent', () => {
  let component: ReduceItemComponent;
  let fixture: ComponentFixture<ReduceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
