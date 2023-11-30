import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonevalidationComponent } from './phonevalidation.component';

describe('PhonevalidationComponent', () => {
  let component: PhonevalidationComponent;
  let fixture: ComponentFixture<PhonevalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonevalidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
