import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAssuranceHistoryComponent } from './social-assurance-history.component';

describe('SocialAssuranceHistoryComponent', () => {
  let component: SocialAssuranceHistoryComponent;
  let fixture: ComponentFixture<SocialAssuranceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAssuranceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAssuranceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
