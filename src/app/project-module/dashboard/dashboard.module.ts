import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DishCategoryComponent } from './components/dish-category/dish-category.component';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';



@NgModule({
  declarations: [DashboardComponent, HomeComponent, DishCategoryComponent, HeaderComponent, DishListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [], schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
