import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './base/Guard.Service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', loadChildren: () => import('./chat-module/chat.module').then(m => m.ChatModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // url mặc định
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
