import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAssuranceHistoryDetailComponent } from './social-assurance-history-detail.component';

describe('SocialAssuranceHistoryDetailComponent', () => {
  let component: SocialAssuranceHistoryDetailComponent;
  let fixture: ComponentFixture<SocialAssuranceHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAssuranceHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAssuranceHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
