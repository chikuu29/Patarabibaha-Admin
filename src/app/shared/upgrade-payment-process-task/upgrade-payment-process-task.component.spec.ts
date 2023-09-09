import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePaymentProcessTaskComponent } from './upgrade-payment-process-task.component';

describe('UpgradePaymentProcessTaskComponent', () => {
  let component: UpgradePaymentProcessTaskComponent;
  let fixture: ComponentFixture<UpgradePaymentProcessTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradePaymentProcessTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradePaymentProcessTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
