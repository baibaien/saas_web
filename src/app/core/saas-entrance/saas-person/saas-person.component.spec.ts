import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasPersonComponent } from './saas-person.component';

describe('SaasPersonComponent', () => {
  let component: SaasPersonComponent;
  let fixture: ComponentFixture<SaasPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaasPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
