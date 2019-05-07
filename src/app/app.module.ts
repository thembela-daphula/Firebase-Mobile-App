
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ShareModule } from './share.module';
import { NotifiticationsComponent } from './info/notifitications/notifitications.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, NotifiticationsComponent],
  entryComponents: [NotifiticationsComponent],
  imports: [
HttpClientModule,
BrowserModule,
IonicModule.forRoot(),
AppRoutingModule,
AngularFireModule.initializeApp(firebaseConfig),
AngularFireAuthModule,
AngularFirestoreModule,
// tslint:disable-next-line: deprecation
HttpModule,
ShareModule
// ShareModule
],
  providers: [
    StatusBar,
    SplashScreen,
{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
UserService,
AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
