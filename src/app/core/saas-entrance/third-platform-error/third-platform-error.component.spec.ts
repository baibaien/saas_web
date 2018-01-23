import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPlatformErrorComponent } from './third-platform-error.component';

describe('ThirdPlatformErrorComponent', () => {
  let component: ThirdPlatformErrorComponent;
  let fixture: ComponentFixture<ThirdPlatformErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPlatformErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPlatformErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
