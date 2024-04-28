import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessstotyapprovelComponent } from './successstotyapprovel.component';

describe('SuccessstotyapprovelComponent', () => {
  let component: SuccessstotyapprovelComponent;
  let fixture: ComponentFixture<SuccessstotyapprovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessstotyapprovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessstotyapprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
