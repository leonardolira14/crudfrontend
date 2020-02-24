import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PloginComponent } from './pages/plogin/plogin.component';
import { PclientesComponent } from './pages/pclientes/pclientes.component';


// rutas de la pagina
const routes: Routes = [
  { path: 'login', component: PloginComponent },
  { path: '', component: PloginComponent },
  { path: 'clientes', component: PclientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
