import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrVerTipsComponent } from './mayihr-ver-tips.component';

describe('MayihrVerTipsComponent', () => {
  let component: MayihrVerTipsComponent;
  let fixture: ComponentFixture<MayihrVerTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrVerTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrVerTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
