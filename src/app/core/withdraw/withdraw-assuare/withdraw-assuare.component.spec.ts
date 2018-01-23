import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawAssuareComponent } from './withdraw-assuare.component';

describe('WithdrawAssuareComponent', () => {
  let component: WithdrawAssuareComponent;
  let fixture: ComponentFixture<WithdrawAssuareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawAssuareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawAssuareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
