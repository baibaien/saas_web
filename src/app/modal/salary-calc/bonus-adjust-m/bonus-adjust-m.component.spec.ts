import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusAdjustMComponent } from './bonus-adjust-m.component';

describe('BonusAdjustMComponent', () => {
  let component: BonusAdjustMComponent;
  let fixture: ComponentFixture<BonusAdjustMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusAdjustMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusAdjustMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
