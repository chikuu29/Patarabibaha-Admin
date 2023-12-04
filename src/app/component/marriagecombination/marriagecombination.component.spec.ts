import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriagecombinationComponent } from './marriagecombination.component';

describe('MarriagecombinationComponent', () => {
  let component: MarriagecombinationComponent;
  let fixture: ComponentFixture<MarriagecombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarriagecombinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriagecombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
