import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdproofapprovalComponent } from './idproofapproval.component';

describe('IdproofapprovalComponent', () => {
  let component: IdproofapprovalComponent;
  let fixture: ComponentFixture<IdproofapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdproofapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdproofapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
