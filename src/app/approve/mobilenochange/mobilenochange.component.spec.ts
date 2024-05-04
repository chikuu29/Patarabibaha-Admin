import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilenochangeComponent } from './mobilenochange.component';

describe('MobilenochangeComponent', () => {
  let component: MobilenochangeComponent;
  let fixture: ComponentFixture<MobilenochangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilenochangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilenochangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
