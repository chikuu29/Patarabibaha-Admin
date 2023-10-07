import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeprofileviewComponent } from './likeprofileview.component';

describe('LikeprofileviewComponent', () => {
  let component: LikeprofileviewComponent;
  let fixture: ComponentFixture<LikeprofileviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeprofileviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeprofileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
