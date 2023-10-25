import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTabComponent } from './ChatTabComponent';

describe('ChatTabComponent', () => {
  let component: ChatTabComponent;
  let fixture: ComponentFixture<ChatTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatTabComponent]
    });
    fixture = TestBed.createComponent(ChatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
