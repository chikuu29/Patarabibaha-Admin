import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContryComponent } from './contry.component';

describe('ContryComponent', () => {
  let component: ContryComponent;
  let fixture: ComponentFixture<ContryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
