import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchatingpageComponent } from './viewchatingpage.component';

describe('ViewchatingpageComponent', () => {
  let component: ViewchatingpageComponent;
  let fixture: ComponentFixture<ViewchatingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewchatingpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewchatingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
