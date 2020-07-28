import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInviteComponent } from './view-invite.component';

describe('ViewInviteComponent', () => {
  let component: ViewInviteComponent;
  let fixture: ComponentFixture<ViewInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
