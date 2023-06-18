import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViweplanComponent } from './viweplan.component';

describe('ViweplanComponent', () => {
  let component: ViweplanComponent;
  let fixture: ComponentFixture<ViweplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViweplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViweplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
