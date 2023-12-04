import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriagestatusComponent } from './marriagestatus.component';

describe('MarriagestatusComponent', () => {
  let component: MarriagestatusComponent;
  let fixture: ComponentFixture<MarriagestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarriagestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriagestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
