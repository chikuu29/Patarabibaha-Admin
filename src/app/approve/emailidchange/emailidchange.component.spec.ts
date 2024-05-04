import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailidchangeComponent } from './emailidchange.component';

describe('EmailidchangeComponent', () => {
  let component: EmailidchangeComponent;
  let fixture: ComponentFixture<EmailidchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailidchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailidchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
