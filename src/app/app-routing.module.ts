import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { StartingPageComponent } from './components/starting-page/starting-page.component';

const routes: Routes = [

  

{
  path:'',
  component: StartingPageComponent,
  pathMatch:"full",
},
{
  path:'login',
  component: UserLoginComponent,
  pathMatch:"full",
},

  
{
  path:'signup',
  component: UserRegistrationComponent,
  pathMatch:"full",
},

{
  path:'home',
  component: HomeComponent,
  pathMatch:"full",
  canActivate: [AuthGuard]

},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
