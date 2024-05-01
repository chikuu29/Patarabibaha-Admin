import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalapprovalComponent } from './salapproval.component';

describe('SalapprovalComponent', () => {
  let component: SalapprovalComponent;
  let fixture: ComponentFixture<SalapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
