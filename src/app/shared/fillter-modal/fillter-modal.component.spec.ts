import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillterModalComponent } from './fillter-modal.component';

describe('FillterModalComponent', () => {
  let component: FillterModalComponent;
  let fixture: ComponentFixture<FillterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
