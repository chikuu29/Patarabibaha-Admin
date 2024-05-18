import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPermissionComponent } from './load-permission.component';

describe('LoadPermissionComponent', () => {
  let component: LoadPermissionComponent;
  let fixture: ComponentFixture<LoadPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
