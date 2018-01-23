import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialServiceModalComponent } from './special-service-modal.component';

describe('SpecialServiceModalComponent', () => {
  let component: SpecialServiceModalComponent;
  let fixture: ComponentFixture<SpecialServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
