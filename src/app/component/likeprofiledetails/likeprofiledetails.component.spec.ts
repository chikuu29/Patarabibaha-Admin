import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeprofiledetailsComponent } from './likeprofiledetails.component';

describe('LikeprofiledetailsComponent', () => {
  let component: LikeprofiledetailsComponent;
  let fixture: ComponentFixture<LikeprofiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeprofiledetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeprofiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
