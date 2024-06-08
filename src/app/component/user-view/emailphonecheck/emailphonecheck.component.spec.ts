import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailphonecheckComponent } from './emailphonecheck.component';

describe('EmailphonecheckComponent', () => {
  let component: EmailphonecheckComponent;
  let fixture: ComponentFixture<EmailphonecheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailphonecheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailphonecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
