import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasUpdateTestComponent } from './saas-update-test.component';

describe('SaasUpdateTestComponent', () => {
  let component: SaasUpdateTestComponent;
  let fixture: ComponentFixture<SaasUpdateTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasUpdateTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasUpdateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
