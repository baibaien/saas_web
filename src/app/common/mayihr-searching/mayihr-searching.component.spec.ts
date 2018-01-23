import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrSearchingComponent } from './mayihr-searching.component';

describe('MayihrSearchingComponent', () => {
  let component: MayihrSearchingComponent;
  let fixture: ComponentFixture<MayihrSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrSearchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
