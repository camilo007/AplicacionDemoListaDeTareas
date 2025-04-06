import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddTaskComponent } from './modals/add-task/add-task.component';
import { AddCategoryComponent } from './modals/add-category/add-category.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireRemoteConfigModule } from '@angular/fire/compat/remote-config';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent,AddTaskComponent,AddCategoryComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(), 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireRemoteConfigModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
