import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInviteComponent } from './edit-invite.component';

describe('EditInviteComponent', () => {
  let component: EditInviteComponent;
  let fixture: ComponentFixture<EditInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
