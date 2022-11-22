import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tarefa', pathMatch: 'full' },
  { path: 'tarefa', component: TaskListComponent },
  { path: 'usuario', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
