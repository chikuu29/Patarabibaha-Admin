import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserapproveComponent } from './userapprove.component';

describe('UserapproveComponent', () => {
  let component: UserapproveComponent;
  let fixture: ComponentFixture<UserapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
