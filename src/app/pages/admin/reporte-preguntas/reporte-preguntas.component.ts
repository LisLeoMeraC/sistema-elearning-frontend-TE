import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reporte-preguntas',
  templateUrl: './reporte-preguntas.component.html',
  styleUrls: ['./reporte-preguntas.component.css']
})
export class ReportePreguntasComponent {

  constructor(
    public dialogRef: MatDialogRef<ReportePreguntasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  printReport(): void {
    window.print();
  }
}
