import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimiumuserComponent } from './primiumuser.component';

describe('PrimiumuserComponent', () => {
  let component: PrimiumuserComponent;
  let fixture: ComponentFixture<PrimiumuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimiumuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimiumuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
