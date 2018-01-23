import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrPagingComponent } from './mayihr-paging.component';

describe('MayihrPagingComponent', () => {
  let component: MayihrPagingComponent;
  let fixture: ComponentFixture<MayihrPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
