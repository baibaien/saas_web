import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPlatformLoginComponent } from './third-platform-login.component';

describe('ThirdPlatformLoginComponent', () => {
  let component: ThirdPlatformLoginComponent;
  let fixture: ComponentFixture<ThirdPlatformLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPlatformLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPlatformLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
