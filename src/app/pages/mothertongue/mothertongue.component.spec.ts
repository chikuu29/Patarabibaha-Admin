import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MothertongueComponent } from './mothertongue.component';

describe('MothertongueComponent', () => {
  let component: MothertongueComponent;
  let fixture: ComponentFixture<MothertongueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MothertongueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MothertongueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
