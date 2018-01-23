import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YgSelfLoginComponent } from './yg-self-login.component';

describe('YgSelfLoginComponent', () => {
  let component: YgSelfLoginComponent;
  let fixture: ComponentFixture<YgSelfLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YgSelfLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YgSelfLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
