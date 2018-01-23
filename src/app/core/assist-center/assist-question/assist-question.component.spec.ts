import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistQuestionComponent } from './assist-question.component';

describe('AssistQuestionComponent', () => {
  let component: AssistQuestionComponent;
  let fixture: ComponentFixture<AssistQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
