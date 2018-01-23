import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexFooterComponent } from './saas-index-footer.component';

describe('SaasIndexFooterComponent', () => {
  let component: SaasIndexFooterComponent;
  let fixture: ComponentFixture<SaasIndexFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
