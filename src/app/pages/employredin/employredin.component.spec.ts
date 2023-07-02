import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployredinComponent } from './employredin.component';

describe('EmployredinComponent', () => {
  let component: EmployredinComponent;
  let fixture: ComponentFixture<EmployredinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployredinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployredinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
