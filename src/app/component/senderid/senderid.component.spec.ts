import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderidComponent } from './senderid.component';

describe('SenderidComponent', () => {
  let component: SenderidComponent;
  let fixture: ComponentFixture<SenderidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenderidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
