import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrSelectComponent } from './mayihr-select.component';

describe('MayihrSelectComponent', () => {
  let component: MayihrSelectComponent;
  let fixture: ComponentFixture<MayihrSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
