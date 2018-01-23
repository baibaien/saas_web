import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCenterComponent } from './document-center.component';

describe('DocumentCenterComponent', () => {
  let component: DocumentCenterComponent;
  let fixture: ComponentFixture<DocumentCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
