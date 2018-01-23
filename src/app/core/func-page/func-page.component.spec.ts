import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncPageComponent } from './func-page.component';

describe('FuncPageComponent', () => {
  let component: FuncPageComponent;
  let fixture: ComponentFixture<FuncPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
