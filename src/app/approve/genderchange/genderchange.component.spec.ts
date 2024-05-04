import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderchangeComponent } from './genderchange.component';

describe('GenderchangeComponent', () => {
  let component: GenderchangeComponent;
  let fixture: ComponentFixture<GenderchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
