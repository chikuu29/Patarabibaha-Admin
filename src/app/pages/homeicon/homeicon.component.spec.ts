import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeiconComponent } from './homeicon.component';

describe('HomeiconComponent', () => {
  let component: HomeiconComponent;
  let fixture: ComponentFixture<HomeiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeiconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
