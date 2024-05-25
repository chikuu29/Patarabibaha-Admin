import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubfeedbackComponent } from './viewsubfeedback.component';

describe('ViewsubfeedbackComponent', () => {
  let component: ViewsubfeedbackComponent;
  let fixture: ComponentFixture<ViewsubfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsubfeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsubfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
