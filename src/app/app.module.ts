import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//componente de un boton de angular material
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { SidebarUserComponent } from './pages/user/sidebar-user/sidebar-user.component';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { ModuleOneComponent } from './pages/user/module-one/module-one.component';
import { ModuleTwoComponent } from './pages/user/module-two/module-two.component';
import { ModuleThreeComponent } from './pages/user/module-three/module-three.component';
import { ViewCategoriaComponent } from './pages/admin/view-categoria/view-categoria.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import {MatSelectModule} from '@angular/material/select';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './pages/admin/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './pages/user/start/start.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ResourcesComponent } from './pages/user/resources/resources.component';
import { RecomendacionesComponent } from './pages/user/recomendaciones/recomendaciones.component';
import { YoutubeVideosComponent } from './pages/user/youtube-videos/youtube-videos.component';
import { AsignaturasComponent } from './pages/user/asignaturas/asignaturas.component';
import { OrganizadorGraficoComponent } from './pages/user/organizador-grafico/organizador-grafico.component';
import { ReportePreguntasComponent } from './pages/admin/reporte-preguntas/reporte-preguntas.component';
import { RecursosEducativosComponent } from './pages/admin/recursos-educativos/recursos-educativos.component';
import { ViewRecursosComponent } from './pages/user/view-recursos/view-recursos.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ViewResourcesDocenteComponent } from './pages/admin/view-resources-docente/view-resources-docente.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar'; 





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    SidebarUserComponent,
    WelcomeUserComponent,
    ProfileUserComponent,
    ModuleOneComponent,
    ModuleTwoComponent,
    ModuleThreeComponent,
    ViewCategoriaComponent,
    AddCategoriaComponent,
    ViewExamenesComponent,
    AddExamenComponent,
    ActualizarExamenComponent,
    ViewExamenPreguntasComponent,
    AddPreguntaComponent,
    ActualizarPreguntaComponent,
    LoadExamenComponent,
    InstruccionesComponent,
    StartComponent,
    ResourcesComponent,
    RecomendacionesComponent,
    YoutubeVideosComponent,
    AsignaturasComponent,
    OrganizadorGraficoComponent,
    ReportePreguntasComponent,
    RecursosEducativosComponent,
    ViewRecursosComponent,
    ViewResourcesDocenteComponent
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,

    //importamos
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatExpansionModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,


    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    DropdownModule,
    SliderModule,
    BreadcrumbModule,
    DialogModule,
    MessagesModule,
    TabViewModule,
    MessageModule,
    PanelModule,
    ProgressBarModule,
    RadioButtonModule 

  ],
  providers: [authInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }

