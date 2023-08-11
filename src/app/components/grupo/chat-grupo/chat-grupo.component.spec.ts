import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGrupoComponent } from './chat-grupo.component';

describe('ChatGrupoComponent', () => {
  let component: ChatGrupoComponent;
  let fixture: ComponentFixture<ChatGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatGrupoComponent]
    });
    fixture = TestBed.createComponent(ChatGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
