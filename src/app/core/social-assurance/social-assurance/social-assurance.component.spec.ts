import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAssuranceComponent } from './social-assurance.component';

describe('SocialAssuranceComponent', () => {
  let component: SocialAssuranceComponent;
  let fixture: ComponentFixture<SocialAssuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAssuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
