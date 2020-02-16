import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularHomeComponent } from './components/angular-home/angular-home.component';


const routes: Routes = [
  { path: 'angularHome', component: AngularHomeComponent },
  { path: '**', redirectTo: '/angularHome', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
