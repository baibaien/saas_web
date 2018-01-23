import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAssuranceReduceMComponent } from './social-assurance-reduce-m.component';

describe('SocialAssuranceReduceMComponent', () => {
  let component: SocialAssuranceReduceMComponent;
  let fixture: ComponentFixture<SocialAssuranceReduceMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAssuranceReduceMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAssuranceReduceMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
