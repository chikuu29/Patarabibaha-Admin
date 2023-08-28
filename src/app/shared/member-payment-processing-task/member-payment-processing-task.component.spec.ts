import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPaymentProcessingTaskComponent } from './member-payment-processing-task.component';

describe('MemberPaymentProcessingTaskComponent', () => {
  let component: MemberPaymentProcessingTaskComponent;
  let fixture: ComponentFixture<MemberPaymentProcessingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPaymentProcessingTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPaymentProcessingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
