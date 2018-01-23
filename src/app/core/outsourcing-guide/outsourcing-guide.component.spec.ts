import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsourcingGuideComponent } from './outsourcing-guide.component';

describe('OutsourcingGuideComponent', () => {
  let component: OutsourcingGuideComponent;
  let fixture: ComponentFixture<OutsourcingGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsourcingGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsourcingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
