import { Component, OnInit } from '@angular/core';
import { RecursoServiceService } from 'src/app/recurso-service.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recursos-educativos',
  templateUrl: './recursos-educativos.component.html',
  styleUrls: ['./recursos-educativos.component.css']
})
export class RecursosEducativosComponent implements OnInit{
  categorias: any = [];
  selectedFile: File | null = null;
  selectedFileName: string='';
  categoriaId: number |null=null; // Este será el ID seleccionado por el usuario


  constructor(
    private archivoService: RecursoServiceService,
    private categoriaService: CategoriaService
    ) {}

    ngOnInit(): void {
      this.categoriaService.listarCategorias().subscribe(
        (dato:any) => {
          this.categorias = dato;
          console.log(this.categorias);
        },(error) => {
          console.log(error);
          Swal.fire('Error !!','Error al cargar los datos','error');
        }
      )
    }

    onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement;
      this.selectedFile = (target.files as FileList)[0];
      this.selectedFileName = this.selectedFile.name;
    }
  
    onUpload() {
      if (this.selectedFile && this.categoriaId) {
        this.archivoService.subirArchivo(this.selectedFile, this.categoriaId)
          .subscribe(
            (response) => {
              console.log('Archivo subido con éxito', response);
              Swal.fire('Archivo Subido','El recurso se ha subido correctamente','success');
              this.selectedFile = null;
              this.categoriaId = null;
              this.selectedFileName='';
            },
            (error) => {
              console.error('Error al subir el archivo', error);
              Swal.fire('Error','Error al subir el recurso','error');
            }
          );
      } else {
        console.error('Debe seleccionar un archivo y una categoría');
      }
    }
}
