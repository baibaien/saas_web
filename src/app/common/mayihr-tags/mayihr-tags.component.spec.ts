import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayihrTagsComponent } from './mayihr-tags.component';

describe('MayihrTagsComponent', () => {
  let component: MayihrTagsComponent;
  let fixture: ComponentFixture<MayihrTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayihrTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayihrTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
