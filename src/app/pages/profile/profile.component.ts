import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editingMode: boolean = false; 

  constructor(private loginService: LoginService, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadUserData();
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  toggleEditingMode(): void {
    this.editingMode = !this.editingMode;
  }

  guardarCambios(): void {
    this.loginService.actualizarUsuario(this.user.id, this.user)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado con éxito'
        });
        this.loadUserData();
        this.editingMode = false;
      });
  }

  loadUserData(): void {
    this.loginService.getCurrentUser().subscribe((userData: any) => {
      this.user = userData;
    });
  }
}