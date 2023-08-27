import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakepaidComponent } from './makepaid.component';

describe('MakepaidComponent', () => {
  let component: MakepaidComponent;
  let fixture: ComponentFixture<MakepaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakepaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakepaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
