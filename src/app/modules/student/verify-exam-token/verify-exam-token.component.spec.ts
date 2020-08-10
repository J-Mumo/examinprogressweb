import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyExamTokenComponent } from './verify-exam-token.component';

describe('VerifyExamTokenComponent', () => {
  let component: VerifyExamTokenComponent;
  let fixture: ComponentFixture<VerifyExamTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyExamTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyExamTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
