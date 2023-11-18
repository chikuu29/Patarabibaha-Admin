import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogineventComponent } from './loginevent.component';

describe('LogineventComponent', () => {
  let component: LogineventComponent;
  let fixture: ComponentFixture<LogineventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogineventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogineventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
