import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePreguntasComponent } from './reporte-preguntas.component';

describe('ReportePreguntasComponent', () => {
  let component: ReportePreguntasComponent;
  let fixture: ComponentFixture<ReportePreguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportePreguntasComponent]
    });
    fixture = TestBed.createComponent(ReportePreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
