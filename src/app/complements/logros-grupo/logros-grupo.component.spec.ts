import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogrosGrupoComponent } from './logros-grupo.component';

describe('LogrosGrupoComponent', () => {
  let component: LogrosGrupoComponent;
  let fixture: ComponentFixture<LogrosGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogrosGrupoComponent]
    });
    fixture = TestBed.createComponent(LogrosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
