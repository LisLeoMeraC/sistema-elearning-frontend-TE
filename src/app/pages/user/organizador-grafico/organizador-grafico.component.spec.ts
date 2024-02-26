import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorGraficoComponent } from './organizador-grafico.component';

describe('OrganizadorGraficoComponent', () => {
  let component: OrganizadorGraficoComponent;
  let fixture: ComponentFixture<OrganizadorGraficoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizadorGraficoComponent]
    });
    fixture = TestBed.createComponent(OrganizadorGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
