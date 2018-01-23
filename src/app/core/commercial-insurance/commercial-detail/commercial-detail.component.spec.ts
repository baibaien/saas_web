import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialDetailComponent } from './commercial-detail.component';

describe('CommercialDetailComponent', () => {
  let component: CommercialDetailComponent;
  let fixture: ComponentFixture<CommercialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
