import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreactivityComponent } from './ignoreactivity.component';

describe('IgnoreactivityComponent', () => {
  let component: IgnoreactivityComponent;
  let fixture: ComponentFixture<IgnoreactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgnoreactivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgnoreactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
