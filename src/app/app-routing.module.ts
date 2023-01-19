import { AuthgGuard } from './components/authg.guard';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { MyNaveComponent } from './components/my-nave/my-nave.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyChartComponent } from './components/pages/my-chart/my-chart.component';
import { MyDashboardComponent } from './components/pages/my-dashboard/my-dashboard.component';
import { MapsComponent } from "./components/pages/maps/maps.component";

const routes: Routes = [

  {path: '',
  component: HomeComponent,
children: [
    {path: 'chart', component: MyChartComponent},
    {path: 'dashboard', component: MyDashboardComponent},
    {path: 'map', component: MapsComponent}
],
  canActivate: [AuthgGuard]
},
{
  path: '',
  component: AuthenticationComponent,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
