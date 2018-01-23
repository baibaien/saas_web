import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ie9TestComponent } from './ie9-test.component';

describe('Ie9TestComponent', () => {
  let component: Ie9TestComponent;
  let fixture: ComponentFixture<Ie9TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ie9TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ie9TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
