import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexConsultComponent } from './saas-index-consult.component';

describe('SaasIndexConsultComponent', () => {
  let component: SaasIndexConsultComponent;
  let fixture: ComponentFixture<SaasIndexConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
