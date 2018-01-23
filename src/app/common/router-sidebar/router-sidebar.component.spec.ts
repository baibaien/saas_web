import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterSidebarComponent } from './router-sidebar.component';

describe('RouterSidebarComponent', () => {
  let component: RouterSidebarComponent;
  let fixture: ComponentFixture<RouterSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
