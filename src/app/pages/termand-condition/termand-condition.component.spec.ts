import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermandConditionComponent } from './termand-condition.component';

describe('TermandConditionComponent', () => {
  let component: TermandConditionComponent;
  let fixture: ComponentFixture<TermandConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermandConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermandConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
