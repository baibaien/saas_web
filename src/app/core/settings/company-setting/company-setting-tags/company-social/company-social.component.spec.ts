import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySocialComponent } from './company-social.component';

describe('CompanySocialComponent', () => {
  let component: CompanySocialComponent;
  let fixture: ComponentFixture<CompanySocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
