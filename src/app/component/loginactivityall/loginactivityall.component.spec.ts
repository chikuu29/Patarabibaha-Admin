import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginactivityallComponent } from './loginactivityall.component';

describe('LoginactivityallComponent', () => {
  let component: LoginactivityallComponent;
  let fixture: ComponentFixture<LoginactivityallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginactivityallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginactivityallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
