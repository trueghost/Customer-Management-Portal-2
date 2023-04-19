import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './Components/data/data.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeGuard } from './Components/home/home.guard';
import { LoginComponent } from './Components/login/login.component';
import { SearchComponent } from './Components/search/search.component';


const routes: Routes = [
 { path:'login', component: LoginComponent , pathMatch: 'full'  },
 { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [HomeGuard] },
 {path:'search',component: SearchComponent},
 {path:'data', component: DataComponent},
 {path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
