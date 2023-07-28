import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuthUserComponent } from './view-auth-user.component';

describe('ViewAuthUserComponent', () => {
  let component: ViewAuthUserComponent;
  let fixture: ComponentFixture<ViewAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
