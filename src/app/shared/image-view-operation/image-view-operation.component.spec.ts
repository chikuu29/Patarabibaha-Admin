import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewOperationComponent } from './image-view-operation.component';

describe('ImageViewOperationComponent', () => {
  let component: ImageViewOperationComponent;
  let fixture: ComponentFixture<ImageViewOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageViewOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageViewOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
