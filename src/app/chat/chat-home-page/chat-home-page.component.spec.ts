import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHomePageComponent } from './chat-home-page.component';

describe('ChatHomePageComponent', () => {
  let component: ChatHomePageComponent;
  let fixture: ComponentFixture<ChatHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
