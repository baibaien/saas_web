import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexSignComponent } from './saas-index-sign.component';

describe('SaasIndexSignComponent', () => {
  let component: SaasIndexSignComponent;
  let fixture: ComponentFixture<SaasIndexSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
