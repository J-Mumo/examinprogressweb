import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeScoringComponent } from './finalize-scoring.component';

describe('FinalizeScoringComponent', () => {
  let component: FinalizeScoringComponent;
  let fixture: ComponentFixture<FinalizeScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizeScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizeScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
