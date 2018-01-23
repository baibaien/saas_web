import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistQuestionDetailComponent } from './assist-question-detail.component';

describe('AssistQuestionDetailComponent', () => {
  let component: AssistQuestionDetailComponent;
  let fixture: ComponentFixture<AssistQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
