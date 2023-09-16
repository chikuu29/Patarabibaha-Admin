import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpotlightComponent } from './view-spotlight.component';

describe('ViewSpotlightComponent', () => {
  let component: ViewSpotlightComponent;
  let fixture: ComponentFixture<ViewSpotlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpotlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
