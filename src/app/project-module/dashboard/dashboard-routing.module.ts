import { DishCategoryComponent } from './components/dish-category/dish-category.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'dish-category/:id',
        component: DishCategoryComponent
      },
      {
        path: 'dish-detail',
        component: DishCategoryComponent
      },
      {
        path: '',
        redirectTo: '/home', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
