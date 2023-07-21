import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotraComponent } from './gotra.component';

describe('GotraComponent', () => {
  let component: GotraComponent;
  let fixture: ComponentFixture<GotraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GotraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
