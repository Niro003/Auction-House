import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from "./registration/registration.component";
import {UsermanagementComponent} from "./usermanagement/usermanagement.component"
import {ChangePasswordComponent} from "./change_password/changepassword.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'users', component: UsermanagementComponent},
    { path: 'new/password', component: ChangePasswordComponent}

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
