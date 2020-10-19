import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPerformanceComponent } from './section-performance.component';

describe('SectionPerformanceComponent', () => {
  let component: SectionPerformanceComponent;
  let fixture: ComponentFixture<SectionPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
