import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveridComponent } from './receiverid.component';

describe('ReceiveridComponent', () => {
  let component: ReceiveridComponent;
  let fixture: ComponentFixture<ReceiveridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
