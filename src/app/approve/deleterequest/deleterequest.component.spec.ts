import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleterequestComponent } from './deleterequest.component';

describe('DeleterequestComponent', () => {
  let component: DeleterequestComponent;
  let fixture: ComponentFixture<DeleterequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleterequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleterequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
