import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  visible: boolean = false;
  loginData = {
    "username" : '',
    "password" : ''
  }

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router,private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  formSubmit(){
    console.log("clic en el boton de login");
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'Admin'){
            
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'Normal'){
            
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    )
  }

  

  showDialog() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '700px', // ajusta el ancho según tus necesidades
      // otras propiedades como height, data, etc.
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('El modal se cerró');
      // Vuelve a listar las asignaturas después de cerrar el modal
      
    });
}


}

