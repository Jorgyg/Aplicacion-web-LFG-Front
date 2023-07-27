import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosGrupoComponent } from './eventos-grupo.component';

describe('EventosGrupoComponent', () => {
  let component: EventosGrupoComponent;
  let fixture: ComponentFixture<EventosGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventosGrupoComponent]
    });
    fixture = TestBed.createComponent(EventosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
