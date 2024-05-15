import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedatashowComponent } from './deletedatashow.component';

describe('DeletedatashowComponent', () => {
  let component: DeletedatashowComponent;
  let fixture: ComponentFixture<DeletedatashowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedatashowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedatashowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
