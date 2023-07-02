import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddionalEducationComponent } from './addional-education.component';

describe('AddionalEducationComponent', () => {
  let component: AddionalEducationComponent;
  let fixture: ComponentFixture<AddionalEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddionalEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddionalEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
