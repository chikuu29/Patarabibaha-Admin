import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualincomeComponent } from './annualincome.component';

describe('AnnualincomeComponent', () => {
  let component: AnnualincomeComponent;
  let fixture: ComponentFixture<AnnualincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualincomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
