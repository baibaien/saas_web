import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistHomeComponent } from './assist-home.component';

describe('AssistHomeComponent', () => {
  let component: AssistHomeComponent;
  let fixture: ComponentFixture<AssistHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
