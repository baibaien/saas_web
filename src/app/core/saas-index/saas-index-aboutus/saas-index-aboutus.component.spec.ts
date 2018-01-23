import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexAboutusComponent } from './saas-index-aboutus.component';

describe('SaasIndexAboutusComponent', () => {
  let component: SaasIndexAboutusComponent;
  let fixture: ComponentFixture<SaasIndexAboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexAboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
