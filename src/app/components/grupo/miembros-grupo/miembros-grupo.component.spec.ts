import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembrosGrupoComponent } from './miembros-grupo.component';

describe('MiembrosGrupoComponent', () => {
  let component: MiembrosGrupoComponent;
  let fixture: ComponentFixture<MiembrosGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiembrosGrupoComponent]
    });
    fixture = TestBed.createComponent(MiembrosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
