import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileimagepproveComponent } from './profileimagepprove.component';

describe('ProfileimagepproveComponent', () => {
  let component: ProfileimagepproveComponent;
  let fixture: ComponentFixture<ProfileimagepproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileimagepproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileimagepproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
