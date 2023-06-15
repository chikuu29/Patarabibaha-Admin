import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NakshatraComponent } from './nakshatra.component';

describe('NakshatraComponent', () => {
  let component: NakshatraComponent;
  let fixture: ComponentFixture<NakshatraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NakshatraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NakshatraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
