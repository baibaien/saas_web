import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoticeComponent } from './modal-notice.component';

describe('ModalNoticeComponent', () => {
  let component: ModalNoticeComponent;
  let fixture: ComponentFixture<ModalNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
