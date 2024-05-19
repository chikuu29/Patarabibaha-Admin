import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendeduserComponent } from './suspendeduser.component';

describe('SuspendeduserComponent', () => {
  let component: SuspendeduserComponent;
  let fixture: ComponentFixture<SuspendeduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendeduserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendeduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
