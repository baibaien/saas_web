import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasPassbackComponent } from './saas-passback.component';

describe('SaasPassbackComponent', () => {
  let component: SaasPassbackComponent;
  let fixture: ComponentFixture<SaasPassbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasPassbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasPassbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
