import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageeventComponent } from './homepageevent.component';

describe('HomepageeventComponent', () => {
  let component: HomepageeventComponent;
  let fixture: ComponentFixture<HomepageeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageeventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
