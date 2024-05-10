import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeuserComponent } from './freeuser.component';

describe('FreeuserComponent', () => {
  let component: FreeuserComponent;
  let fixture: ComponentFixture<FreeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
