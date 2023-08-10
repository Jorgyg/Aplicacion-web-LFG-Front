import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetarGrupoComponent } from './retar-grupo.component';

describe('RetarGrupoComponent', () => {
  let component: RetarGrupoComponent;
  let fixture: ComponentFixture<RetarGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetarGrupoComponent]
    });
    fixture = TestBed.createComponent(RetarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
