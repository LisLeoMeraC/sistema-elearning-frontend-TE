import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AdminGuard } from './services/admin.guard.service';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { ModuleOneComponent } from './pages/user/module-one/module-one.component';
import { ModuleTwoComponent } from './pages/user/module-two/module-two.component';
import { ModuleThreeComponent } from './pages/user/module-three/module-three.component';
import { ViewCategoriaComponent } from './pages/admin/view-categoria/view-categoria.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './pages/admin/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { startWith } from 'rxjs';
import { StartComponent } from './pages/user/start/start.component';
import { ResourcesComponent } from './pages/user/resources/resources.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { RecomendacionesComponent } from './pages/user/recomendaciones/recomendaciones.component';
import { AsignaturasComponent } from './pages/user/asignaturas/asignaturas.component';
import { OrganizadorGraficoComponent } from './pages/user/organizador-grafico/organizador-grafico.component';
import { RecursosEducativosComponent } from './pages/admin/recursos-educativos/recursos-educativos.component';
import { ViewRecursosComponent } from './pages/user/view-recursos/view-recursos.component';
import { ViewResourcesDocenteComponent } from './pages/admin/view-resources-docente/view-resources-docente.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },

  {
    path:'home',
    component:HomeComponent,
    pathMatch:'full'
  },

  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
        canActivate:[AdminGuard],
        children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path : '',
        component : WelcomeComponent,
        data: { breadcrumb: 'Inicio' }

      },
      {
        path : 'asignaturas',
        component : ViewCategoriaComponent
      },
      {
        path:"add-asignatura",
        component: AddCategoriaComponent
      },
      {
        path:"recursos-educativos",
        component: ViewResourcesDocenteComponent
      },
      
      {
        path:"cuestionarios",
        component: ViewExamenesComponent
      },
      {
          path:"view-cuestionarios/:id",
          component:ViewExamenesComponent
      },
      {
        path:"view-recursos/:id",
        component:ViewResourcesDocenteComponent
      },
      {
        path:"add-cuestionario",
        component: AddExamenComponent
      }
      ,
      {
        path:"cuestionario/:examenId",
        component: ActualizarExamenComponent
      },
      {
        path:'ver-preguntas/:examenId/:titulo',
        component:ViewExamenPreguntasComponent
      },
      {
        path:'add-pregunta/:examenId/:titulo',
        component : AddPreguntaComponent
      },
      {
        path:'pregunta/:preguntaId',
        component:ActualizarPreguntaComponent
      }
    
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children : [
      {
        path:'load-examen/:id',
        component:LoadExamenComponent
      },
      {
        path : '',
        component : WelcomeUserComponent
      },
      {
        path:'instrucciones/:examenId',
        component:InstruccionesComponent
      },
      {
        path:'resources',
        component:ResourcesComponent
      },
      {
        path:'module-one',
        component:ModuleOneComponent
      },

      {
        path:'profile-user',
        component:ProfileUserComponent
      },
      {
        path:'recomendaciones',
        component:RecomendacionesComponent
      },
      {
        path:'asignaturas',
        component:AsignaturasComponent
      },
      {
        path:'organizador-grafico',
        component:OrganizadorGraficoComponent
      },
      {
        path:'view-recursos/:id',
        component:ViewRecursosComponent
      }

    ]
  },
  {
    path:"start/:examenId",
    component:StartComponent,
    canActivate:[NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

