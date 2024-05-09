import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulksmssendComponent } from './bulksmssend.component';

describe('BulksmssendComponent', () => {
  let component: BulksmssendComponent;
  let fixture: ComponentFixture<BulksmssendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulksmssendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulksmssendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
