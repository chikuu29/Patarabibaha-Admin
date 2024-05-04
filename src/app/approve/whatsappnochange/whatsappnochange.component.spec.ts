import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappnochangeComponent } from './whatsappnochange.component';

describe('WhatsappnochangeComponent', () => {
  let component: WhatsappnochangeComponent;
  let fixture: ComponentFixture<WhatsappnochangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappnochangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappnochangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
