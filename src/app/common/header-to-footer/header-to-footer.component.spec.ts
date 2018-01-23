import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderToFooterComponent } from './header-to-footer.component';

describe('HeaderToFooterComponent', () => {
  let component: HeaderToFooterComponent;
  let fixture: ComponentFixture<HeaderToFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderToFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderToFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
