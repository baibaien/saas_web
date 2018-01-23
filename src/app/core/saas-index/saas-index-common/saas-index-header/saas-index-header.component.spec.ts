import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasIndexHeaderComponent } from './saas-index-header.component';

describe('SaasIndexHeaderComponent', () => {
  let component: SaasIndexHeaderComponent;
  let fixture: ComponentFixture<SaasIndexHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasIndexHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasIndexHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
