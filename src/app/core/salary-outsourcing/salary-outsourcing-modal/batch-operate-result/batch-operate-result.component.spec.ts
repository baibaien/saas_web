import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOperateResultComponent } from './batch-operate-result.component';

describe('BatchOperateResultComponent', () => {
  let component: BatchOperateResultComponent;
  let fixture: ComponentFixture<BatchOperateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchOperateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchOperateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
