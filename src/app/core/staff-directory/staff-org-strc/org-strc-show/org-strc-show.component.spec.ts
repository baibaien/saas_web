import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStrcShowComponent } from './org-strc-show.component';

describe('OrgStrcShowComponent', () => {
  let component: OrgStrcShowComponent;
  let fixture: ComponentFixture<OrgStrcShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgStrcShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgStrcShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
