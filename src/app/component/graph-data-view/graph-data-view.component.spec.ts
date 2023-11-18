import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDataViewComponent } from './graph-data-view.component';

describe('GraphDataViewComponent', () => {
  let component: GraphDataViewComponent;
  let fixture: ComponentFixture<GraphDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
