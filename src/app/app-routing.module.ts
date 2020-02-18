import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularHomeComponent } from './components/angular-home/angular-home.component';
import { CubeComponent } from './components/cube/cube.component';
import { CustomGalaxyComponent } from './components/custom-galaxy/custom-galaxy.component';


const routes: Routes = [
  { path: 'angularHome', component: AngularHomeComponent },
  { path: 'cube', component: CubeComponent },
  { path: 'galaxy', component: CustomGalaxyComponent },
  { path: '**', redirectTo: '/galaxy', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
