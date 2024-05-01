import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopeapprovalComponent } from './horoscopeapproval.component';

describe('HoroscopeapprovalComponent', () => {
  let component: HoroscopeapprovalComponent;
  let fixture: ComponentFixture<HoroscopeapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoroscopeapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoroscopeapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
