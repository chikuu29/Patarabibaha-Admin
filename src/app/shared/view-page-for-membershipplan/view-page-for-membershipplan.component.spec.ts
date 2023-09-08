import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPageForMembershipplanComponent } from './view-page-for-membershipplan.component';

describe('ViewPageForMembershipplanComponent', () => {
  let component: ViewPageForMembershipplanComponent;
  let fixture: ComponentFixture<ViewPageForMembershipplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPageForMembershipplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPageForMembershipplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
