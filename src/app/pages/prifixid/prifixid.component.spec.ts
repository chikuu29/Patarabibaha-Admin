import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrifixidComponent } from './prifixid.component';

describe('PrifixidComponent', () => {
  let component: PrifixidComponent;
  let fixture: ComponentFixture<PrifixidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrifixidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrifixidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
