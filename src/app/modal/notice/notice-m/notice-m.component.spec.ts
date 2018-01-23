import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeMComponent } from './notice-m.component';

describe('NoticeMComponent', () => {
  let component: NoticeMComponent;
  let fixture: ComponentFixture<NoticeMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
