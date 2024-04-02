import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Rol {
  name: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit{

  roles: Rol[] | undefined;

    selectedRol: Rol | undefined;

  public user={
    username:'',
    password:'',
    nombre:'',
    apellido:'',
    email:'',
    telefono:'',
    identidad:'',
    rolFormulario:''
  }

  constructor(private userService:UserService, private snack:MatSnackBar, private router:Router,
    private dialogRef: MatDialogRef<SignupComponent>){ }

  ngOnInit() 
  {
    this.roles=[
      {name:'Docente'},
      {name:'Estudiante'}
    ];
    
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username==''||this.user.username==null){
      this.snack.open('El nombre de usuario es requerido!!','Aceptar',{
        duration: 3000,
        verticalPosition : 'top',
        horizontalPosition: 'right'
      })
      return;
    }
    this.userService.registrarUsuario(this.user).subscribe(
      (data: any)=>{
        console.log(data);
        Swal.fire('Usuario Guardado','Usuario registrado con éxito en el sistema','success')
        this.CloseModal();
        this.router.navigate(['login']);
      },(error: any)=>{
        console.log(error);
        this.snack.open('Ya hay un usuario registrado con ese nombre!!','Aceptar',{
          duration: 3000
        })
      }
    )
    
  }

  CloseModal(){
    this.dialogRef.close();
   }
}
