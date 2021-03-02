import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBlotterComponent } from './commonblotter.component';

describe('CommonBlotterComponent', () => {
  let component: CommonBlotterComponent;
  let fixture: ComponentFixture<CommonBlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonBlotterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
