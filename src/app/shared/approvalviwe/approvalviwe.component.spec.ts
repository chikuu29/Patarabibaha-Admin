import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalviweComponent } from './approvalviwe.component';

describe('ApprovalviweComponent', () => {
  let component: ApprovalviweComponent;
  let fixture: ComponentFixture<ApprovalviweComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalviweComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalviweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
