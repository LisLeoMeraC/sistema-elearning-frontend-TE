import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecursoServiceService } from 'src/app/recurso-service.service';

@Component({
  selector: 'app-view-recursos',
  templateUrl: './view-recursos.component.html',
  styleUrls: ['./view-recursos.component.css']
})
export class ViewRecursosComponent implements OnInit {
  archivos:any[]=[];

  constructor(private recursoService:RecursoServiceService,  private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idCategoria = +params['id']; // El signo '+' convierte la cadena a número
      this.recursoService.getArchivosPorCategoria(idCategoria).subscribe(data => {
        this.archivos = data;
        
      });
    });
  }

  obtenerIcono(archivo: { nombreArchivo: string; }): string {
    // Aquí puedes poner una lógica para devolver un ícono basado en el tipo de archivo
    // Por ejemplo:
    if (archivo.nombreArchivo.endsWith('.pdf')) {
      return 'picture_as_pdf';
    } else if (archivo.nombreArchivo.endsWith('.pptx')) {
      return 'slideshow';
    } else {
      return 'insert_drive_file'; // Ícono por defecto para otros tipos de archivos
    }
  }

}
