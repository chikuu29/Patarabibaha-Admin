import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCroperComponent } from './image-croper.component';

describe('ImageCroperComponent', () => {
  let component: ImageCroperComponent;
  let fixture: ComponentFixture<ImageCroperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCroperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCroperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
