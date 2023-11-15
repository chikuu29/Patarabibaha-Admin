import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadmincreateComponent } from './subadmincreate.component';

describe('SubadmincreateComponent', () => {
  let component: SubadmincreateComponent;
  let fixture: ComponentFixture<SubadmincreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadmincreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadmincreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
