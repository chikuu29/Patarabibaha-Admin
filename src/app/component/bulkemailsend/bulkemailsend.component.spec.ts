import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkemailsendComponent } from './bulkemailsend.component';

describe('BulkemailsendComponent', () => {
  let component: BulkemailsendComponent;
  let fixture: ComponentFixture<BulkemailsendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkemailsendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkemailsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
