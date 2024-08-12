import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAdvComponent } from './banner-adv.component';

describe('BannerAdvComponent', () => {
  let component: BannerAdvComponent;
  let fixture: ComponentFixture<BannerAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
