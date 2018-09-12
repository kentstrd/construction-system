import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './project/view/view.component';
import { ManageFormComponent } from './project/manage-form/manage-form.component';

const routes: Routes = [
  { path: ':header/:view-options/view/:id', component: ViewComponent },
  { path: ':header/:view-options/:manage-form/:id', component: ManageFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
