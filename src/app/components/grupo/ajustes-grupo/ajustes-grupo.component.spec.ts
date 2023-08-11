import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesGrupoComponent } from './ajustes-grupo.component';

describe('AjustesGrupoComponent', () => {
  let component: AjustesGrupoComponent;
  let fixture: ComponentFixture<AjustesGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjustesGrupoComponent]
    });
    fixture = TestBed.createComponent(AjustesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
