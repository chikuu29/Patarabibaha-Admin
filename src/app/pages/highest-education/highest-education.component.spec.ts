import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestEducationComponent } from './highest-education.component';

describe('HighestEducationComponent', () => {
  let component: HighestEducationComponent;
  let fixture: ComponentFixture<HighestEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
