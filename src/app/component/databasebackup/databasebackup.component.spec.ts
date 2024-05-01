import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasebackupComponent } from './databasebackup.component';

describe('DatabasebackupComponent', () => {
  let component: DatabasebackupComponent;
  let fixture: ComponentFixture<DatabasebackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasebackupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabasebackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
