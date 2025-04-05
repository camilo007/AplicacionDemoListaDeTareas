import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TasksPage } from './tasks.page';

import { TaskPageRoutingModule } from './tasks-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TaskPageRoutingModule
  ],
  declarations: [TasksPage]
})
export class TasksPageModule {}
