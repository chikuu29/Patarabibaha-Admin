import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeatilsComponent } from './plan-deatils.component';

describe('PlanDeatilsComponent', () => {
  let component: PlanDeatilsComponent;
  let fixture: ComponentFixture<PlanDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
