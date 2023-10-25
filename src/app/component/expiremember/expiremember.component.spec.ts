import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirememberComponent } from './expiremember.component';

describe('ExpirememberComponent', () => {
  let component: ExpirememberComponent;
  let fixture: ComponentFixture<ExpirememberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirememberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirememberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
