import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YgselfSettingComponent } from './ygself-setting.component';

describe('YgselfSettingComponent', () => {
  let component: YgselfSettingComponent;
  let fixture: ComponentFixture<YgselfSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YgselfSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YgselfSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
