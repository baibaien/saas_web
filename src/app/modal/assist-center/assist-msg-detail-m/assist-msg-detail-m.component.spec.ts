import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistMsgDetailMComponent } from './assist-msg-detail-m.component';

describe('AssistMsgDetailMComponent', () => {
  let component: AssistMsgDetailMComponent;
  let fixture: ComponentFixture<AssistMsgDetailMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistMsgDetailMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistMsgDetailMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
