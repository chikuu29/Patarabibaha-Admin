import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtypeComponent } from './addtype.component';

describe('AddtypeComponent', () => {
  let component: AddtypeComponent;
  let fixture: ComponentFixture<AddtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
