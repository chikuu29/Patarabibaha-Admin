import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminviewComponent } from './subadminview.component';

describe('SubadminviewComponent', () => {
  let component: SubadminviewComponent;
  let fixture: ComponentFixture<SubadminviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
