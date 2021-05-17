import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { ResumePublicComponent } from './public-resume/resume-public.component';
import { ResumeCreateComponent } from './resume/resumeCreate.component';
import { ResumeEditComponent } from './resume/resumeEdit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resume-public', redirectTo: '', pathMatch: 'full' },
  { path: 'resume-public/:username', component: ResumePublicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resume', component: ResumeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'create', component: ResumeCreateComponent },
      { path: 'edit', component: ResumeEditComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
