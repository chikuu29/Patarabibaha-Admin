import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserViewComponent } from './chat-user-view.component';

describe('ChatUserViewComponent', () => {
  let component: ChatUserViewComponent;
  let fixture: ComponentFixture<ChatUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatUserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
