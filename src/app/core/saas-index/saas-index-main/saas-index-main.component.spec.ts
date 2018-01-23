import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexMainComponent } from './saas-index-main.component';

describe('SaasIndexMainComponent', () => {
  let component: SaasIndexMainComponent;
  let fixture: ComponentFixture<SaasIndexMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
