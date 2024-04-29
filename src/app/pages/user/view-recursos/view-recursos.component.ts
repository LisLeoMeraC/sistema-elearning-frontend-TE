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
        console.log(data)
        
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

  descargarArchivo(id: number) {
    this.recursoService.descargarArchivo(id).subscribe((data: Blob) => {

      const randomString = Math.random().toString().slice(2,12);
      // Crea un enlace en el documento
      const a = document.createElement('a');
      const objectUrl = window.URL.createObjectURL(data);
  
      // Utiliza el nombre del archivo original cuando lo asignas
      a.href = objectUrl;
      a.download = `archivo_${randomString}`;// Aquí deberías poner el nombre real del archivo que deseas.
      document.body.appendChild(a); // Añade el enlace al documento
      a.click();
      window.URL.revokeObjectURL(objectUrl); // Limpia la URL del objeto Blob
      a.remove(); // Elimina el enlace una vez que se ha hecho clic
    });
  }
  
  convertirTamanoA_MB(tamanoEnBytes: number): number {
    return tamanoEnBytes / 1024 / 1024;
  }

  obtenerNombreSinExtension(nombreArchivo: string): string {
    return nombreArchivo.replace(/\.[^/.]+$/, "");
  }

  // Obtiene la extensión limpia del tipo de archivo
  obtenerExtensionArchivo(tipoArchivo: string): string {
    const matches = tipoArchivo.match(/\/([a-z]+)/i);
    if (matches && matches[1]) {
      return matches[1].toUpperCase(); // Retorna la extensión en mayúsculas
    }
    return "DESCONOCIDO"; // Retorna un valor por defecto si no encuentra la extensión
  }

  

}
