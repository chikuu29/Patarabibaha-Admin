import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoredeatilsComponent } from './ignoredeatils.component';

describe('IgnoredeatilsComponent', () => {
  let component: IgnoredeatilsComponent;
  let fixture: ComponentFixture<IgnoredeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgnoredeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgnoredeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
