import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetforgottenpasswordComponent } from './resetforgottenpassword.component';

describe('ResetforgottenpasswordComponent', () => {
  let component: ResetforgottenpasswordComponent;
  let fixture: ComponentFixture<ResetforgottenpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetforgottenpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetforgottenpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
