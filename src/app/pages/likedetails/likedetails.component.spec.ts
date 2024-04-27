import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedetailsComponent } from './likedetails.component';

describe('LikedetailsComponent', () => {
  let component: LikedetailsComponent;
  let fixture: ComponentFixture<LikedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
