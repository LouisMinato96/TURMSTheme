import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularHomeComponent } from './components/angular-home/angular-home.component';
import { CubeComponent } from './components/cube/cube.component';
import { CustomGalaxyComponent } from './components/custom-galaxy/custom-galaxy.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularHomeComponent,
    CubeComponent,
    CustomGalaxyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
