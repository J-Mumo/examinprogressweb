import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminprogressComponent } from './examinprogress.component';

describe('ExaminprogressComponent', () => {
  let component: ExaminprogressComponent;
  let fixture: ComponentFixture<ExaminprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
